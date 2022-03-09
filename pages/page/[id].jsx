import React from 'react';
import PagesController from '../../lib/pages/pagesController';
import serializable from '../../lib/serializable';
import ServerProps from '../../lib/serverProps';
import Access from '../../utils/access';
import Error from '../../components/Error';
import Page from '../../components/pages/Page';

const ContentPage = ({ state, page }) => {
  if ((!page.id && !page.new) || (!Access.can('manage', state.user) && page.new)) {
    return <Error statusCode={404} state={state} />;
  }
  return <Page.Page state={state} page={page}  />;
}

export async function getServerSideProps({ query, req, res }) {
  const state = await ServerProps.getState(req);
  const page = query.id !== 'new' 
    ? await PagesController.findById(query.id)
    : { status: 'draft', new:true };
  return {
    props: {
      state,
      page: serializable(page),
    },
  };
}

export default ContentPage;
