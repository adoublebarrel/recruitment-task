import crypto from 'crypto'
import cuid from 'cuid'
import { type } from 'os';

function randomDate(start: Date, end: Date) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

export const types = ['Set top box', 'Lightbulb', 'Smoke detector']
export const NAME_MAX_LENGTH = 255;

export function addAppliance({id, name, type}: {id: string, name: string, type: string}) {
  const appliance = {
    id,
    name,
    type,
    createdAt: new Date(Date.now()),
  }

  appliances.push(appliance);

  return appliance;
}

export function getAppliance(id: string) {
  return appliances.find((a) => a.id === id);
}

export function updateAppliance(id: string, {name, type}: {id: string, name: string, type: string}) {
  const index = appliances.findIndex(a => a.id === id);

  if (index == -1) {
    throw "appliance not found";
  }

  appliances[index].name = name;
  appliances[index].type = type;

  return appliances[index];
}

export function deleteAppliance(id: string) {
  const index = appliances.findIndex(a => a.id === id);
  
  if (index !== -1) appliances.splice(index, 1);
}

const appliances: any[] = [];

for (let i = 0; i < 100; i++) {
  appliances.push({
    id: cuid(),
    name: `Appliance ${crypto.randomBytes(2).toString('hex')}`,
    type: types[Math.floor(Math.random() * types.length)],
    createdAt: randomDate(new Date(2022, 0, 1), new Date(2022, 0, 30)),
  })
}

export default appliances
