const c = {
  MANAGE: 'manage',
  MANAGEDB: 'manageDb',
};

const Access = {
  user: { role: 'visitor' },
  roles: {
    member : ['comment'],
    author : ['createpost'],
    admin : ['manage', 'createpost', 'comment'],
    superadmin : ['manageDb','manage', 'createpost', 'comment'],
  },
  init(user) {
    Access.user = user;
  },
  can(cap, user) {
    return Access.roles[user.role]?.indexOf(cap) > -1;
  },
  capabilities: c,
};

export default Access;
