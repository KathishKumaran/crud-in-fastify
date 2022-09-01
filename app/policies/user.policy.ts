import { UserInstance } from '../types';

export default class UserPolicy {
  constructor(private currentUser: UserInstance) { }

  canList() {
    return this.currentUser.isAdmin();
  }
  canInvite() {
    return this.currentUser.isAdmin();
  }
  canCreateUsers() {
    return this.currentUser.isAdmin();
  }
  canUpdate() {
    return this.currentUser.isAdmin();
  }
  canDelete() {
    return this.currentUser.isAdmin();
  }
}
