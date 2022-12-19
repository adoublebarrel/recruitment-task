import {types, NAME_MAX_LENGTH} from './db';

export function isValidApplianceId(id: any) {
  const re = /^[a-z0-9]+$/;

  if (id?.length && re.exec(id)) {
    return true;
  }

  return false;
}

export function isValidApplianceType(type: string) {
  if (types.includes(type)) {
    return true;
  }

  return false;
}

export function isValidApplianceName(name: any) {
  const re = /^[a-zA-Z ]+$/;
  if (name?.length < NAME_MAX_LENGTH && re.exec(name)) {
    return true;
  }

  return false;
}

export function isAppliance(input: any) {

  if (isValidApplianceType(input?.type) && isValidApplianceName(input?.name)) {
    return true;
  }

  return false;

}