import React from 'react';
import { Container} from 'react-bootstrap';
 
import ServerProps from '../../lib/serverProps';
import DashBoardLayout from '../../components/DashBoardLayout';
import PagesController from '../../lib/pages/pagesController';
import serializable from '../../lib/serializable';
import Page from '../../components/pages/Page';
import DashboardModelNavbar from '../../components/DashboardModelNavbar';
import IconButton from '../../components/IconButton';

const PagesDashboardPage = ({ state, data }) => (
  <DashBoardLayout 
    title="StrideEquity | Dashboard" 
    state={state}
  >
    <Container>
      <DashboardModelNavbar model="Pages" data={data}>
        <IconButton href="/page/new" icon="plus">new page</IconButton>
      </DashboardModelNavbar>
      <Page.List pages={data.pages} compact />
    </Container>
  </DashBoardLayout>
);

export async function getServerSideProps({ query, req, res }) {
   
  const data = {};
  if (query.s) {
    data.pages = await PagesController.search(query.s);
    data.s = query.s;
  } else {
    data.pages = await PagesController.getPages();
  }
  return {
    props: {
      state: await ServerProps.getState(req),
      data: serializable(data),
    },
  };
}

export default PagesDashboardPage;
