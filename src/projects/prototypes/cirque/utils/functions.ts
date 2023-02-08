import { CosmosClient } from '@azure/cosmos';

import json from './../database.json';

export async function getData(): Promise<any> {
  const endpoint = 'https://cae-dga-cace-cosmo-d-riseanalyticscirque.documents.azure.com:443/'; // Add your endpoint
  const key =
    'hEKVPHCSBT9WLBwDZ3JFORPTLpoEvzAXql16qMSzoYoAgHQAEwVhUliC1EgiftK7rDAsNRk0TopGTP2mZX2bPQ=='; // Add the masterkey of the endpoint
  const client = new CosmosClient({
    endpoint,
    key,
    connectionPolicy: {
      enableEndpointDiscovery: false,
    },
  });

  const databaseId = { id: 'riseanalyticscirquedb' };
  const containerId = { id: 'CirqueFrontEnd' };

  const { database } = await client.databases.createIfNotExists(databaseId);
  const { container } = await database.containers.createIfNotExists(containerId);
  const { resources } = await container.items.query('SELECT * from c').fetchAll();

  for (const data of resources) {
    if (data.id === 'Boeing') {
      return data;
    }
  }
  return json;
}
