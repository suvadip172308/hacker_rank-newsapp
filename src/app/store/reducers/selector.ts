import {createSelector } from 'reselect';
import { getNewsList, getFilter, getState } from './news.reducer';

export const getNews = createSelector(
  getState,
  getNewsList,
  getFilter
);
