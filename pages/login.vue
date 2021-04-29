<template>
  <v-app id="login">
     <v-toolbar-title class = "pulse_secondary">
        <span class="pulse_primary--text font-weight-bold mb-3">{{ "MPulse" }}</span>
      </v-toolbar-title>
    <v-main>
      <v-container fluid class="green lighten-3 fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" md="3">
            <v-card
              class="elevation-6 rounded pulse_primary"
              outlined
              v-if="forgotPassword == false && createNewPasswordCard == false"
            >
              <v-card-title class="pulse_secondary--text pt-4"
                ><h4 class="mt-3 ml-4" color="pulse_primary">{{ title }}</h4>
                <v-spacer />
                <img
                  src="../assets/images/logo.png"
                  width="45%"
                />
              </v-card-title>
              <v-card-text>
                <v-form ref="LoginForm" v-model="validLoginForm" class="mr-4 ml-4">
                  <v-col class="pb-0">
                    <v-row class="pulse_primary--text font-weight-bold mb-1">
                      Email ID
                    </v-row>
                    <v-row>
                      <v-text-field
                        v-model="Email"
                        placeholder="Enter your Email ID"
                        name="Email"
                        ref="Email"
                        type="text"
                        counter
                        :rules="[
                          (v) => !!v || 'Please fill this field',
                          (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)  || 'E-mail must be valid']"
                        clearable
                        color="pulse_primary"
                        outlined
                        dense
                        @keyup.native.enter="Login"
                      ></v-text-field>
                    </v-row>
                  </v-col>
                  <v-col class="mt-0 pt-0 mb-0 pb-0">
                    <v-row class="pulse_primary--text font-weight-bold mb-1">
                      Password
                    </v-row>
                    <v-row>
                      <v-text-field
                        placeholder="Enter password"
                        :append-icon="show ? 'visibility' : 'visibility_off'"
                        ref="password"
                        v-model="password"
                        :rules="[(v) => !!v || 'Password is required',
                                (v) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least Min 8 characters, lowercase letter, one number, a special character and one uppercase letter',
                                ]"
                        clearable
                        outlined
                        minlength="8"
                        dense
                        color="pulse_primary"
                        counter
                        :type="show ? 'text' : 'password'"
                        @click:append="show = !show"
                        @keyup.native.enter="Login"
                      ></v-text-field>
                    </v-row>
                  </v-col>
                  <v-col class="pb-0 pt-0 text-right pr-1">
                    <v-btn
                      class="body-2 pr-0 mr-0"
                      @click="forgotPasswordAction"
                      text
                      small
                      color="transparent"
                      style="textTransform: none"
                      :loading="forgotPasswordButtonLoading"
                    >
                      <span class="grey--text font-weight-bold mb-1">Forgot password?</span>
                    </v-btn>
                  </v-col>
                </v-form>
              </v-card-text>
              <v-card-actions class="pa-4 ml-4 mr-4 pb-5 pt-0">
                <v-btn
                  block
                  color="pulse_primary"
                  :loading="loading"
                  dark
                  @click="Login"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-card>
            <v-card
              class="elevation-6 rounded pa-4 pt-2 "
              outlined
              v-if="forgotPassword == true &&  createNewPasswordCard== false"
            >
              <v-card-title class="pulse_primary--text font-weight-bold mb-2"
                >Forgot Password
              </v-card-title>
              <v-card-text>
                <v-form ref="RequestOtpForm" class="black--text text--darken-2" v-model="validLoginForm">
                  Share your email Id, we will send you an OTP (one time
                  password) to your email. You can login using that.
                  <v-col class="pb-0 mt-4">
                    <v-row class="pulse_primary--text font-weight-bold mb-1">
                      Email ID
                    </v-row>
                    <v-row>
                      <v-text-field
                        v-model="requestOtpEmail"
                        placeholder="Enter your email ID"
                        name="Email"
                        ref="Email"
                        type="text"
                        counter
                         :rules="[
                          (v) => !!v || 'Please fill this field',
                          (v) => !v || /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v)  || 'E-mail must be valid']"
                        clearable
                        color="pulse_primary"
                        outlined
                        dense
                      ></v-text-field>
                    </v-row>
                  </v-col>
                </v-form>
              </v-card-text>
              <v-card-actions class="layout column ml-2 mr-2 pt-0 pb-0">
                <v-btn
                  block
                  color="pulse_primary"
                  :loading="requestOtpButtonLoading"
                  dark
                  @click="requestOtp"
                  >Request OTP</v-btn
                >
                <v-col class="text-center mb-0 pb-0">
                  <v-btn
                    @click="goToLoginPage"
                    block
                    text
                    color="transparent"
                  >
                    <v-flex class="primary--text font-weight-bold ">LOGIN</v-flex>
                  </v-btn>
                </v-col>
              </v-card-actions>
            </v-card>
            <v-card
              class="elevation-6 rounded pa-4 pt-2"
              outlined
              v-if="forgotPassword == false && createNewPasswordCard == true"
            >
              <v-card-title class="pulse_primary--text"
                >Create new password
              </v-card-title>
              <v-card-text>
                <v-form ref="ForgotPasswordForm">
                 Password must contain at least Min 8 characters, lowercase letter,
                  one number, a special character and one uppercase letter.
                  <v-col class="mb-0 pb-0 mt-4">
                    <v-row class="pulse_primary--text font-weight-bold mb-1">
                      Enter Password
                    </v-row>
                    <v-row>
                      <v-text-field
                        :append-icon="showNewPassword ? 'visibility' : 'visibility_off'"
                        v-model="newPassword"
                        ref="newPassword"
                        :rules="[(v) => !!v || 'Password is required',
                        (v) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least Min 8 characters, lowercase letter, one number, a special character and one uppercase letter',
                        (v) => v.length >= 8 || 'Min 8 characters']"
                        clearable
                        outlined
                        dense
                        color="pulse_primary"
                        counter
                        minlength="8"
                        :type="showNewPassword ? 'text' : 'password'"
                        @click:append="showNewPassword = !showNewPassword"
                      ></v-text-field>
                    </v-row>
                  </v-col>
                  <v-col class="mt-0 pt-0 mb-0 pb-0">
                    <v-row class="pulse_primary--text font-weight-bold mb-1">
                      Re-enter Password
                    </v-row>
                    <v-row>
                      <v-text-field
                        :append-icon="showConfirmPassword ? 'visibility' : 'visibility_off'"
                        v-model="confirmPassword"
                        :rules="[(v) => !!v || 'Password is required',
                        (v) => /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) || 'Password must contain at least Min 8 characters, lowercase letter, one number, a special character and one uppercase letter',
                        (v) => v.length >= 8 || 'Min 8 characters']"
                        clearable
                        outlined
                        dense
                        color="pulse_primary"
                        counter
                        minlength="8"
                        :type="showConfirmPassword ? 'text' : 'password'"
                        @click:append="showConfirmPassword = !showConfirmPassword"
                      ></v-text-field>
                    </v-row>
                  </v-col>
                </v-form>
              </v-card-text>
              <v-card-actions class="layout column ml-2 mr-2 pt-0">
                <v-btn
                  block
                  color="pulse_primary"
                  dark
                  :loading="forgotPasswordButtonLoading"
                  @click="createNewPassword"
                  >Create new password</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, namespace } from "nuxt-property-decorator";
const user = namespace('user');

@Component({
  components: {
  },
})
export default class Login extends Vue {
  title: string = "LOGIN";
  loading: boolean = false;
  Email: string = "";
  password: string = "";
  show: boolean = false;
  validLoginForm: boolean = false;
  forgotPasswordButtonLoading: boolean = false;
  forgotPassword: boolean = false;
  createNewPasswordCard: boolean = false;
  newPassword: string = ''
  confirmPassword: string = ''
  requestOtpButtonLoading: boolean = false;
  requestOtpEmail: string = ''
  showConfirmPassword: boolean = false
  showNewPassword: boolean = false

  // Order Store
  @user.Mutation
  public setUserInfo!: (data: object) => void

  //function to reset login form validation
  resetValidationFunction(): void {
    if (this.$refs.loginForm != undefined)
      (this.$refs.loginForm as Vue & {
        resetValidation: () => void;
      }).resetValidation();
  }

  resetEmailValidation(): void {
    if (this.$refs.Email != undefined)
      (this.$refs.Email as Vue & {
        resetValidation: () => void;
      }).resetValidation();
    if (this.$refs.requestOtpEmail != undefined)
      (this.$refs.requestOtpEmail as Vue & {
        resetValidation: () => void;
      }).resetValidation();
  }

  resetForgotPasswordFormValidation(): void {
    if (this.$refs.newPassword != undefined)
      (this.$refs.newPassword as Vue & {
        resetValidation: () => void;
      }).resetValidation();
    if (this.$refs.ForgotPasswordForm != undefined)
      (this.$refs.ForgotPasswordForm as Vue & {
        resetValidation: () => void;
      }).resetValidation();
  }

  //Function to clear the input fields and reset form validations
  clearAll() {
    this.Email = "";
    this.password = ''
    this.newPassword = ''
    this.confirmPassword = ''
    this.requestOtpEmail = ""
    this.forgotPassword = false;
    this.createNewPasswordCard = false;
    this.resetValidationFunction()
    this.resetForgotPasswordFormValidation()
  }

  forgotPasswordAction() {
    this.forgotPasswordButtonLoading = true;
    this.forgotPassword = true;
    //redirect to login page to show request OTP form
    this.Email = "";
    this.requestOtpEmail = ""
    this.forgotPasswordButtonLoading = false;
    this.resetEmailValidation();
  }

  goToLoginPage() {
    this.clearAll()
    this.resetValidationFunction()
  }

  //function to request OTP by calling the API
  async requestOtp() {
    if (
      (this.$refs.RequestOtpForm as Vue & { validate: () => boolean }).validate()
    ) {
      alert(this.requestOtpEmail)
      alert("REQUEST SEND SUCCESSFULLY")
    }

  }







  //function to call the API to create new password
  async createNewPassword() {
    if (
      (this.$refs.ForgotPasswordForm as Vue & { validate: () => boolean }).validate()
    ) {
      this.forgotPasswordButtonLoading = true
      return
    }
  }


  async Login() {
    this.loading = true
    if (
      !(this.$refs.LoginForm as Vue & { validate: () => boolean }).validate()
    ) {
      this.loading = false
      return
    }
    alert(this.Email)
    alert(this.password)
    this.$router.push({ name: "dashboard" });
  }

}
</script>
<style scoped>
</style>
