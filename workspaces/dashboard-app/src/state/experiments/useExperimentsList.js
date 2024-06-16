import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useClient } from 'hooks/useClient';
import { useGlobal } from 'hooks/useGlobal';
import { useQueryState } from 'hooks/useQueryState';
import { useWebsites } from '@/state/useWebsites';

export const useExperimentsList = () => {
  const [view, setView] = useQueryState('view', 'All');
  const [sortBy, setSortBy] = useQueryState('sortBy', 'status');
  const [direction, setDirection] = useQueryState('direction', 'desc');
  const [searchText, setSearchText] = useQueryState('searchText', '');
  const [error, setError] = useState(null);
  const [fetchTime, setFetchTime] = useState(0);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const apiClient = useClient();
  const { website } = useWebsites();
  const websiteId = website?.id || '';

  const { data: allExperiments } = useQuery({
    queryKey: ['EXPERIMENTS', websiteId],
    enabled: !!websiteId,
    queryFn: async (...args) => apiClient.get(`/websites/${website.id}/experiments`),
  });

  const handleSortChange = (sortKey) => {
    const dir = sortKey !== sortBy ? 'asc' : direction === 'desc' ? 'asc' : 'desc';
    localStorage.setItem(lsKeySortBy, sortKey);
    setSortBy(sortKey);
    localStorage.setItem(lsKeySortDirection, dir);
    setDirection(dir);
  };

  const handleSearch = (text) => {
    localStorage.setItem(lsKeySearchText, text);
    setSearchText(text);
  };

  const resetFilters = () => {
    localStorage.removeItem(lsKeySearchText);
    localStorage.removeItem(lsKeySortBy);
    localStorage.removeItem(lsKeySortDirection);
    setDirection('desc');
    setSortBy('status');
    setSearchText('');
  };

  const theExperiments = useMemo(() => {
    if (!allExperiments) return [];
    const experiments = (
      view === 'All'
        ? allExperiments.filter((exp) => !exp.archived)
        : view === 'Archived'
          ? allExperiments.filter((exp) => !!exp.archived)
          : allExperiments.filter((exp) => exp.status === view && !exp.archived)
    ).sort((a, b) => {
      if (sortBy === 'status') {
        if (direction === 'asc') {
          return statusSortMap[b.status] - statusSortMap[a.status];
        } else {
          return statusSortMap[a.status] - statusSortMap[b.status];
        }
      }

      if (direction === 'asc') {
        return a[sortBy] < b[sortBy] ? 1 : -1;
      } else {
        return a[sortBy] > b[sortBy] ? 1 : -1;
      }
    });

    return searchText
      ? experiments.filter((exp) => {
          const regex = new RegExp(searchText, 'i');
          return regex.test(exp.name);
        })
      : experiments;
  }, [allExperiments, view, sortBy, direction, searchText]);

  const counts = useMemo(() => {
    if (!allExperiments) return null;

    const counts = {
      All: allExperiments.filter((exp) => !exp.archived).length,
      Archived: 0,
      Running: 0,
      Ended: 0,
      Draft: 0,
    };

    for (let exp of allExperiments) {
      if (!!exp.archived) {
        counts.Archived++;
        continue;
      }
      counts[exp.status]++;
    }
    return counts;
  }, [allExperiments]);

  const changeView = (view) => {
    setView(view);
    window.location.hash = view;
  };

  return {
    experiments: theExperiments,
    counts,
    sortBy,
    direction,
    loading,
    view,
    error,
    visitorCounts: [],
    searchText,
    changeView,
    setError,
    setPage,
    handleSortChange,
    handleSearch,
    resetFilters,
    handlePageChange: setPage,
  };
};

const statusSortMap = {
  Running: 0,
  Draft: 1,
  Ended: 2,
};

const lsKeySortBy = 'PERTENTO_EXPERIMENTS_SORTBY';
const lsKeySortDirection = 'PERTENTO_EXPERIMENTS_SORT_DIRECTION';
const lsKeySearchText = 'PERTENTO_EXPERIMENTS_SEARCH_TEXT';
