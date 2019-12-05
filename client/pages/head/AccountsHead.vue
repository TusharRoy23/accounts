<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="5">
                <b-form @submit="createSubHead">
                    <b-card>
                        <div slot="header">
                            <strong>Sub-Head </strong><small>Settings</small>
                        </div>
                        <b-form-group>
                            <label for="company">Head Name</label>
                            <b-form-select 
                                id="basicSelect"
                                :plain="true"
                                :options="['Please select','Asset', 'Liabilities', 'Income', 'Expenses']"
                                value="Please select"
                                v-model="model.head"
                            >
                            </b-form-select>
                        </b-form-group>
                        <b-form-group>
                            <label for="company">Sub-Head Name</label>
                            <form-input 
                                type="text"
                                :value="model.subHead"
                                name="subHead"
                                v-model="model.subHead"
                                v-validate="'required'"
                                placeholder="Enter Sub-Head name"
                                :error="errors.first('subHead')"
                            />
                        </b-form-group>
                        <b-form-group>
                            <div class="form-row">
                                <div class="col-sm-2">
                                    Status :
                                </div>
                                <div class="col-sm-8 form-inline">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" v-model="model.subHeadStatus" checked>
                                        <label class="form-check-label" for="inlineRadio1">Active</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="0" v-model="model.subHeadStatus">
                                        <label class="form-check-label" for="inlineRadio2">In-Active</label>
                                    </div>
                                </div>
                            </div>
                        </b-form-group>
                        
                        <b-form-group>
                            <label for="country"></label>
                            <btn 
                                type="submit" 
                                size="lg" 
                                :variant="primary"
                                label="Create"
                                :disabled="loading"
                                :loading="loading"
                                class="px-4"
                            />
                        </b-form-group>
                        <b-alert :show="dismissCountDown"
                                dismissible
                                fade
                                @dismiss-count-down="countDownChanged"
                                :variant="varient">
                            Alert will dismiss after {{dismissCountDown}} seconds...
                        </b-alert>
                    </b-card>
                </b-form>
            </b-col>
            <b-col sm="7">
                <b-card>
                    <table class="table table-responsive-sm">
                        <thead>
                            <tr>
                                <th class="text-center">SL No</th>
                                <th class="text-center">Head Name</th>
                                <th class="text-center">Sub-Head Name</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(subHead, index) in subHeadList" :key="index">
                                <td class="text-center">{{index + 1}}</td>
                                <td class="text-center">
                                    {{subHead.HeadName}}
                                </td>
                                <td class="text-center">
                                    <span :id="'name-'+subHead._id">
                                        {{subHead.subHeadName}}
                                    </span>
                                    <span :id="'inputF-'+subHead._id" style="display:none">
                                        <input type="text" class="form-control" :id="'ref-'+subHead._id" :value="subHead.subHeadName">
                                        <p :id="'msg-'+subHead._id" style="display: none; color: #ff7979">
                                            Value Required !
                                        </p>
                                    </span>
                                </td>
                                <td class="text-center">
                                    <b-col sm xs="12" class="text-center mt-3">
                                        <b-button variant="primary" class="btn-pill" @click="edit(subHead._id)" :id="'edit-'+subHead._id">
                                            <i class="fa fa-pencil"></i>                                   
                                        </b-button>
                                        <b-button variant="success" style="display:none" class="btn-pill" @click="save(subHead._id)" :id="'save-'+subHead._id">
                                            <i class="fa fa-check"></i>                                   
                                        </b-button>
                                        <b-button variant="danger" style="display:none" class="btn-pill" @click="editClose(subHead._id)" :id="'close-'+subHead._id">
                                            <i class="fa fa-close"></i>                                   
                                        </b-button>
                                        
                                        <b-button variant="success" class="btn-pill" @click="publish(subHead._id, subHead.status)">
                                            <i class="fa fa-lock" v-if="subHead.status"></i>
                                            <i class="fa fa-unlock" v-else></i>
                                        </b-button>
                                        <b-button variant="danger" class="btn-pill" @click="deletesubHead(subHead._id)">
                                            <i class="fa fa-trash"></i>
                                        </b-button>
                                    </b-col>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </b-card>
            </b-col>
        </b-row>
        
    </div>
</template>
<script>
import formMixin from '@client/mixins/form';
import { UPDATE_SUBHEAD, CREATE_SUBHEAD, DELETE_SUBHEAD, UPDATE_STATUS } from '@store/subHead/actions';

export default {
    name: 'AccountsHead',
    mixins: [formMixin],
    data() {
        return {
            model: {
                head: '',
                subHead: '',
                subHeadStatus: 1
            },
            subhead: {
                subheadName: '',
                subSubHead: '',
                status: 1
            },
            dismissSecs: 5,
            dismissCountDown: 0,
            varient: 'success'
        }
    },
    methods: {
        createSubHead (e) {
            e.preventDefault();
            
            this.$validator.validate().then(isValid => {
                this.$store.dispatch(CREATE_SUBHEAD, this.model)
                .then((response) => {
                    if(response.data) {
                        this.getSubHeadList();
                    }
                })
                .catch(error => {
                    console.log(error);
                })
            })
        },
        edit(id) {
            this.$nextTick(function() {
                document.getElementById('name-'+id).style.display = document.getElementById('edit-'+id).style.display ="none";
                document.getElementById('inputF-'+id).style.display = document.getElementById('close-'+id).style.display = document.getElementById('save-'+id).style.display = "inline";
                document.getElementById('ref-'+id).focus();
            }.bind(this))
        },
        editClose (id){
            this.$nextTick(function() {
                document.getElementById('close-'+id).style.display = document.getElementById('save-'+id).style.display = document.getElementById('inputF-'+id).style.display = "none";
                document.getElementById('name-'+id).style.display = document.getElementById('edit-'+id).style.display = "inline";
            }.bind(this));
        },
        save (id) {
            var subHead = document.getElementById('ref-'+id).value;
            if (subHead) {
                this.toggleLoading()
                this.$store.dispatch(UPDATE_SUBHEAD, {subHead, id})
                .then((response) => {
                    
                    if (response.data) {
                        this.getSubHeadList();
                        this.editClose(id);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
                this.toggleLoading();
            }
            else{
                document.getElementById('msg-'+id).style.display = "inline";
            }
        },
        publish(id, status) {
            this.$store.dispatch(UPDATE_STATUS, {id, status})
            .then((response) => {
                this.getSubHeadList();
            })
            .catch(error => {
                console.log(error);
            })
        },
        deletesubHead (id) {
            this.$store.dispatch(DELETE_SUBHEAD, {id:id})
            .then((response) => {
                this.getSubHeadList();
            })
            .catch(error => {
                console.log(error)
            })
        },
        countDownChanged(dismissCountDown) {
            this.dismissCountDown = dismissCountDown
        }
    },
    mounted() {
        this.getSubHeadList();
    },
}
</script>