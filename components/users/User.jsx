import React from 'react';
import Link from 'next/link';
import { Badge, Table } from 'react-bootstrap';
import UserAvatar from './UserAvatar';
import IconButton from '../IconButton';
import Icons from '../icons';
import Status from '../Status';

const User = ({ user, admin = false }) => (admin 
  ? (
    <Link href={`/dashboard/users/edit/${user.id}`}>
      <a><UserAvatar user={user} /> {user.name} <Role role={user.role} /></a>
    </Link>
  ) : (
    <span><UserAvatar user={user} /> {user.name}</span>
  )
);

const variant = (role) => ({ 
  member: 'info', 
  admin: 'primary', 
  superadmin: 'success',
}[role || 'member']);

const Role = ({ role }) => <Badge variant={variant(role)}>{ role }</Badge>;
 
const UserTable = ({ users }) => (
  <Table className="card-table">
    <thead>
      <tr>
        <th>user</th>
        <th>email</th>
        <th>role</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user) => (
        <tr key={user.id}>
          <td><User user={user} admin /> <Badges user={user} /></td>
          <td>{user.email} </td>
          <td><Role role={user.role} /></td>
        </tr>
      ))}
    </tbody>
  </Table>
);

const Badges = ({ user }) => (
  <>
    { user.verifiedWholesale ? <Icons.Award size={16} /> : null }
    { user.verifiedId ? <Icons.Id size={16} /> : null }
    { user.googleId ? <Icons.Google size={16} /> : null }
    { user.linkedinId ? <Icons.Linkedin size={16} /> : null }
  </>
);

User.Table = UserTable;
User.Badges = Badges;
export default User;
