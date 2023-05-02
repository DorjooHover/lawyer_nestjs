export enum UserType {
  // create order => in lawyer or without lawyer, view services, view lawyers, request lawyer, 
  user = 'user',
  // create services, verify lawyer ,  change userType, userStatus without system 
  admin = 'admin',
  // get order, view orders themselves, create availableDays for services, update them infos 
  lawyer = 'lawyer',
  // system
  system = 'system'
}

export enum UserStatus {
  // lawyer requested 
  pending = "pending",
  // user created or lawyer verified
  active = 'active',
  // someone reason ban user
  banned = 'banned'
}

export enum ServiceType {
  // voice call
  onlineEmergency='onlineEmergency',
  // video call
  online='online',
  // ordered meet 
  fulfilled = 'fulfilled',
  // emergency meet 
  fulfilledEmergency = 'fulfilledEmergency'
}

export enum ServiceStatus {
  // without pay
  pending = 'pending',
  // user created order
  active = 'active',
  // order cancelled user or lawyer did't meet
  cancelled = 'cancelled',
  // success order
  finished = 'finished'
}

export enum TimeStatus {
  // active lawyers
  active = 'active',
  // working
  progress = 'progress',
  // denied
  denied = 'denied',
  // ended
  ended = 'ended'
}