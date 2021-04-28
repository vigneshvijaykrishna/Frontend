import { Module, Mutation, MutationAction, Action, VuexModule } from 'vuex-module-decorators';
import { UserData } from '@/types/index'

@Module({
    name: 'user',
    stateFactory: true,
    namespaced: true
})
export default class User extends VuexModule {
    userInfo: UserData = {
        Email: '',
        role: ''
    };

    get userEmail() {
        return this.userInfo.Email;
    }

    get userRole() {
        return this.userInfo.role;
    }
    @Mutation
    clearUser() {
        this.userInfo = {
            Email: '',
            role: ''
        };
    }

    @Mutation
    async setUserInfo(data: UserData) {
        this.userInfo = {
            Email: data.Email,
            role: data.role
        }
    }

}
