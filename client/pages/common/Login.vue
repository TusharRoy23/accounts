<template>
    <div class="animated fadeIn">
        <div class="app flex-row align-items-center">
            <div class="container">
                <b-row class="justify-content-center">
                    <b-col md="8">
                        <b-card-group>
                            <b-card no-body class="p-4">
                                <b-card-body>
                                    <b-form @submit.prevent="getLogin('getLogin')" data-vv-scope="getLogin">
                                        <h1>Login</h1>
                                        <p class="text-muted">Sign In to your account</p>
                                        <b-input-group class="mb-3">
                                            <b-input-group-prepend><b-input-group-text><i class="icon-user"></i></b-input-group-text></b-input-group-prepend>
                                            <b-form-input name="email" 
                                                v-validate="'required|email|min:3'" 
                                                class="form-control"
                                                type="email" 
                                                v-model="model.email"
                                                placeholder="example@mail.com"
                                            >
                                            </b-form-input>
                                        </b-input-group>
                                        <span v-show="errors.has('getLogin.email')" style="color:#ff7979">{{ errors.first('getLogin.email') }}</span>
                                        <b-input-group class="mb-4">
                                            <b-input-group-prepend><b-input-group-text><i class="icon-lock"></i></b-input-group-text></b-input-group-prepend>
                                            <b-form-input name="password" 
                                                v-validate="'required|min:6'" 
                                                class="form-control"
                                                type="password" 
                                                v-model="model.password"
                                                placeholder="Enter your Password"
                                            >
                                            </b-form-input>
                                        </b-input-group>
                                        <span v-show="errors.has('getLogin.password')" style="color:#ff7979">{{ errors.first('getLogin.password') }}</span>
                                        <span v-if="error.loginErr" style="color:#ff7979">{{error.loginErr}}</span>
                                        <b-row>
                                            <b-col cols="6">
                                            <btn 
                                                    type="submit" 
                                                    size="md" 
                                                    :variant="primary"
                                                    label="Sign In"
                                                    :disabled="loading"
                                                    :loading="loading"
                                                    class="px-4"
                                                />
                                            </b-col>
                                            <!-- <b-col cols="6" class="text-right">
                                            <b-button variant="link" class="px-0">Forgot password?</b-button>
                                            </b-col> -->
                                        </b-row>
                                    </b-form>
                                </b-card-body>
                            </b-card>
                            <b-card no-body class="text-white bg-primary py-5 d-md-down-none" style="width:44%">
                                <b-card-body class="text-center">
                                    <div>
                                        <h2>Sign up</h2>
                                        <b-form @submit.prevent="getRegister('getRegister')" data-vv-scope="getRegister">
                                                <b-form-group>
                                                    <label for="company">Full Name</label>
                                                    <b-form-input 
                                                        name="regUsername" 
                                                        v-validate="'required|min:3'" 
                                                        class="form-control"
                                                        type="text" 
                                                        v-model="register.regUsername"
                                                        placeholder="Enter your Full Name"
                                                    >
                                                    </b-form-input>
                                                </b-form-group>
                                                <span v-show="errors.has('getRegister.regUsername')" style="color:#ff7979">{{ errors.first('getRegister.regUsername') }}</span>
                                                <b-form-group>
                                                    <label for="vat">E-mail</label>
                                                    <b-form-input 
                                                        name="regEmail" 
                                                        v-validate="'required|email|min:3'" 
                                                        class="form-control"
                                                        type="email" 
                                                        v-model="register.regEmail"
                                                        placeholder="example@mail.com"
                                                    >
                                                    </b-form-input>
                                                </b-form-group>
                                                <span v-show="errors.has('getRegister.regEmail')" style="color:#ff7979">{{ errors.first('getRegister.regEmail') }}</span>
                                                <b-form-group>
                                                    <label for="street">Password</label>
                                                    <b-form-input 
                                                        name="regPassword" 
                                                        v-validate="'required|min:6'" 
                                                        class="form-control"
                                                        type="password" 
                                                        v-model="register.regPassword"
                                                        placeholder="Type Your Password"
                                                    >
                                                    </b-form-input>
                                                </b-form-group>
                                                <span v-show="errors.has('getRegister.regPassword')" style="color:#ff7979">{{ errors.first('getRegister.regPassword') }}</span>
                                                <span v-if="success.regMsg" style="color:#84ec61">{{ success.regMsg }}</span>
                                                <b-form-group>
                                                    <label for="country"></label>
                                                    <btn 
                                                        type="submit" 
                                                        size="lg" 
                                                        :variant="primary"
                                                        label="Register"
                                                        :disabled="loading"
                                                        :loading="loading"
                                                        class="px-4"
                                                        style="background-color: #84ec61; color: #fff"
                                                    />
                                                </b-form-group>

                                        </b-form>
                                    </div>
                                </b-card-body>
                            </b-card>
                        </b-card-group>
                    </b-col>
                </b-row>
            </div>
        </div>
    </div>
</template>
<script>
import formMixin from '@client/mixins/form';
import { POST_LOGIN, POST_LOGOUT, GET_USER_INFO, POST_REGISTER } from '@store/auth/actions';

export default {
    name: 'Login',
    mixins: [formMixin],
    data() {
        return {
            model: {
                username:'',
                password:'',
                email: ''
            },
            error: {
                loginErr: ''
            },
            register: {
                regUsername:'',
                regPassword:'',
                regEmail: ''
            },
            success: {
                regMsg: ''
            }
        }
    },
    methods: {
        getLogin (getLogin) {
            this.error.username = "";
            this.error.password = "";

            this.$validator.validateAll(getLogin).then(isValid => {
                if (!isValid) {
                    return 
                }

                this.toggleLoading()
                this.$store.dispatch(POST_LOGIN, this.model)
                .then((response) => {
                    this.toggleLoading()
                    if (response.data.status) {
                        this.setAuth(response.data)
                        this.$router.push('/dashboard');
                    }
                    else{
                        this.error.loginErr = response.data.msg;
                    }
                    
                })
                .catch(error => {
                    this.toggleLoading()
                  
                    Object.keys(error.response.data).forEach(field => {
                        this.errors.add({
                            field,
                            msg: error.response.data[field]
                        });
                    });
                });

                
            })
        },
        getRegister(getRegister) {
            this.$validator.validateAll(getRegister).then(isValid => {
                if (!isValid) {
                    return 
                }
                console.log(this.register);
                this.toggleLoading()
                this.$store.dispatch(POST_REGISTER, this.register)
                .then((response) => {
                    if (response.data.status) {
                        this.setAuth(response.data)
                        this.success.regMsg = "User Created Successful !";
                        // this.$router.push('/dashboard');
                    }
                })
                .catch(error => {
                    Object.keys(error.response.data).forEach(field => {
                        this.errors.add({
                            field,
                            msg: error.response.data[field]
                        });
                    });
                });

                this.toggleLoading()
            })
        }
    },
}
</script>