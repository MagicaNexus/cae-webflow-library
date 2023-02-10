// import { CosmosClient } from '@azure/cosmos';
// import dotenv from 'dotenv';
import json from './../database.json';

export function getData(): any {
  // const endpoint = process.env.COSMO_ENDPOINT as string; // Add your endpoint
  // const key = process.env.COSMO_KEY as string; // Add the masterkey of the endpoint
  // const client = new CosmosClient({
  //   endpoint,
  //   key,
  //   connectionPolicy: {
  //     enableEndpointDiscovery: false,
  //   },
  // });

  // const databaseId = { id: 'riseanalyticscirquedb' };
  // const containerId = { id: 'CirqueFrontEnd' };

  // const { database } = await client.databases.createIfNotExists(databaseId);
  // const { container } = await database.containers.createIfNotExists(containerId);
  // const { resources } = await container.items.query('SELECT * from c').fetchAll();

  // for (const data of resources) {
  //   if (data.id === 'Boeing') {
  //     //return data;
  //   }
  // }

  // const response = await fetch(
  //   'https://cae-dga-cace-cosmo-d-riseanalyticscirque.documents.azure.com:443/dbs/riseanalyticscirquedb/colls/CirqueFrontEnd/',
  //   {
  //     method: 'GET',
  //     mode: 'no-cors',
  //     headers: {
  //       Accept: 'application/json',
  //       'x-ms-date': 'Tue, 01 Dec 2020 00:00:00 GMT',
  //       'x-ms-version': '2018-12-31',
  //     },
  //   }
  // );

  // console.log(response);

  return json;
}
