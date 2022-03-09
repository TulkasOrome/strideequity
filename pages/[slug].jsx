import React from 'react';
import PagesController from '../lib/pages/pagesController';
import serializable from '../lib/serializable';
import ServerProps from '../lib/serverProps';
import Page from '../components/pages/Page';
import Error from '../components/Error';


const ContentPage = ({ state, page }) =>  {
  if (!page.id ) {
    return <Error statusCode={404} state={state} />;
  }
  return <Page.Page state={state} page={page} />;
};

export async function getServerSideProps({ query, req, res }) {
  const page = await PagesController.findBySlug(query.slug);
  console.log('page', page, query)
  return {
    props: {
      state: await ServerProps.getState(req),
      page: serializable(page),
    },
  };
}

export default ContentPage;
