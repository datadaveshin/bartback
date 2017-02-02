"use strict";

let users = [{
  id: 1,
  user_name: 'Dave11',
  email: 'dave11@fakeyahoo.com',
  hashed_password: '$2a$12$U5M88rMbp3gDmbO4YSdVIeSsaD/.USl1gXORZyQqixkyOfLiXPblK',
  created_at: new Date('2016-12-08 12:10:00 UTC'),
  updated_at: new Date('2016-12-08 12:10:00 UTC')
}, {
  id: 2,
  user_name: 'Tonka22',
  email: 'tonka22@fakegmail.com',
  hashed_password: '$2a$12$96rEOq0r5ExtJmkOCg94Z.CS3jbq91DvLBd4yti.a9blkbmDw.1iO',
  created_at: new Date('2016-12-08 12:15:00 UTC'),
  updated_at: new Date('2016-12-08 12:15:00 UTC')
}, {
  id: 3,
  user_name: 'Patty33',
  email: 'patty33@fakeaol.com',
  hashed_password: '$2a$12$X27Hv3Yshb6J9AqKUa1lDeVmqV0IU/MW4XtZkMuHZbqWiOTwwGx5u',
  created_at: new Date('2016-12-08 12:20:00 UTC'),
  updated_at: new Date('2016-12-08 12:20:00 UTC')
}, {
  id: 4,
  user_name: 'Wilson44',
  email: 'wilson44@fakeyahoo.com',
  hashed_password: '$2a$12$W3YqFsspNIbUbGdZKz3YgORfTagzsUtwFQ6qGMKwX4zeRq03JLDDC',
  created_at: new Date('2016-12-08 12:25:00 UTC'),
  updated_at: new Date('2016-12-08 12:25:00 UTC')
}, {
  id: 5,
  user_name: 'Santa55',
  email: 'santa55@fakegmail.com',
  hashed_password: '$2a$12$8nRosrnVKYtKRVXzuiw0SuxszzFST3rb9L.Zqsq628Pn67Hcfw/tG',
  created_at: new Date('2016-12-08 12:30:00 UTC'),
  updated_at: new Date('2016-12-08 12:30:00 UTC')
}, {
  id: 6,
  user_name: 'Patty66',
  email: 'patty66@fakeaol.com',
  hashed_password: '$2a$12$uP0WqNHWVSGSKTRUsuJSiee8ug4CRvDAk3OGWa6wEMe6CHbs9UmvK',
  created_at: new Date('2016-12-08 12:35:30 UTC'),
  updated_at: new Date('2016-12-08 12:35:30 UTC')
}];

exports.seed = function(knex, Promise) {
    let seedPromises = users.map((user) => {
        return knex('users').insert(user)
    });
    return knex('users').del().then(() => {
        return Promise.all(seedPromises);
  	});
};
