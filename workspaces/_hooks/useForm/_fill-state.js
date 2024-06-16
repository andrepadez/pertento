import findPath from './_find-path';

const fillState = (theForm, initialState, setState, setFilledState, stateRef) => {
  const filledState = JSON.parse(JSON.stringify(initialState));
  const elements = Array.from(theForm.querySelectorAll('*'));
  elements.forEach((elem) => {
    if (!elem.name || elem.nodeName === 'FIELDSET') return;

    const path = findPath(elem, theForm);
    let target = filledState;
    for (let i = 0; i < path.length; i++) {
      let prop = path[i];
      target[prop] = target[prop] || {};
      target = target[prop];
    }

    //TODO account for unchecked checkboxes (false not null)
    target[elem.name] = typeof target[elem.name] !== 'undefined' ? target[elem.name] : null;

    setState(filledState);

    stateRef.current = filledState;
    setFilledState(true);
  });
};

export default fillState;
