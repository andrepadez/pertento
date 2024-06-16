import { db, eq, inArray, GanOauth, GanProperties, GanEventTags } from 'pertentodb';
import { getHeadersFromOauth } from './_get-headers-for-oauth';

const GOOGLE_API_URL = `https://analyticsdata.googleapis.com/v1beta/properties`;

export const refreshPropertyTags = async (ganPropertyId) => {
  console.log('------------- refreshing property tags for', ganPropertyId, ' -------------');
  const headers = await getHeadersFromOauth(ganPropertyId);
  const payload = buildPayload(ganPropertyId);
  const data = await fetchPropertyTagsFromGoogle(ganPropertyId, payload, headers);
  if (!data.rows) return console.log('no rows in response');
  const uniqueEventsArray = getUniqueEventsArray(data.rows, ganPropertyId);
  const dbEvents = await getEventsFromDb(ganPropertyId);
  const remainingEvents = await updateAndDeleteEvents(ganPropertyId, uniqueEventsArray, dbEvents);
  await insertNewEvents(ganPropertyId, remainingEvents);
  console.log('------------- finished property tags for', ganPropertyId, ' -------------');
};

const buildPayload = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const startDate = '2021-01-01';
  const endDate = tomorrow.toISOString().split('T')[0];

  const payload = {
    dateRanges: [{ startDate, endDate }],
    dimensions: [{ name: 'eventName' }, { name: 'isConversionEvent' }],
    metrics: [{ name: 'activeUsers' }],
  };
  return payload;
};

const fetchPropertyTagsFromGoogle = async (ganPropertyId, payload, headers) => {
  const url = `${GOOGLE_API_URL}/${ganPropertyId}:runReport`;
  console.log(url);
  console.log(headers);
  console.log(payload);
  const result = await fetch(url, {
    method: 'post',
    headers,
    body: JSON.stringify(payload),
  });
  console.log('response from google', result.status, result.statusText);

  return result.json();
};

const getUniqueEventsArray = (rows, ganPropertyId) => {
  const eventsArray = rows
    .map(({ dimensionValues: [name, conversion] }) => ({
      ganPropertyId: ganPropertyId,
      name: name.value,
      isConversion: conversion.value !== '(not set)' && conversion.value !== '',
    }))
    .sort((a, b) => a.name.localeCompare(b.name));

  return eventsArray.filter((event, index, self) => index === self.findIndex((e) => e.name === event.name));
};

const getEventsFromDb = async (ganPropertyId) => {
  return db.select().from(GanEventTags).where(eq(GanEventTags.ganPropertyId, ganPropertyId));
};

const updateAndDeleteEvents = async (ganPropertyId, uniqueEventsArray, dbEvents) => {
  const remainingEvents = [...uniqueEventsArray];
  for (let dbEvent of dbEvents) {
    const newEventIndex = remainingEvents.findIndex((e) => e.name === dbEvent.name);
    if (newEventIndex !== -1) {
      const [newEvent] = remainingEvents.splice(newEventIndex, 1);
      if (newEvent.isConversion !== dbEvent.isConversion) {
        await db
          .update(GanEventTags)
          .set({ isConversion: newEvent.isConversion })
          .where(eq(GanEventTags.id, dbEvent.id));
        console.log('updated event', newEvent.name, 'for property', ganPropertyId);
      }
    } else {
      await db.delete(GanEventTags).where(eq(GanEventTags.id, dbEvent.id));
      console.log('deleted event', dbEvent.name, 'for property', ganPropertyId);
    }
  }

  return remainingEvents;
};

const insertNewEvents = async (ganPropertyId, remainingEvents) => {
  console.log('remainingEvents', remainingEvents);
  for (let newEvent of remainingEvents) {
    await db.insert(GanEventTags).values(newEvent);
    console.log('inserted event', newEvent.name, 'for property', ganPropertyId);
  }
};
