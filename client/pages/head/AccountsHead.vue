<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="5">
                <b-form @submit.prevent="createSubHead('createSubHead')" data-vv-scope="createSubHead">
                    <b-card>
                        <div slot="header">
                            <strong>Sub-Head </strong><small>Settings</small>
                        </div>
                        <b-form-group>
                            <label for="company">Head Name</label>
                            <b-form-select
                                :plain="true"
                                :options="['-- Please select --','Asset', 'Liabilities', 'Income', 'Expenses']"
                                v-model="model.head"
                            >
                            </b-form-select>
                        </b-form-group>
                        <b-form-group>
                            <label for="company">Sub-Head Name</label>
                            <b-form-input 
                                name="subHead" 
                                v-validate="'required|min:2'" 
                                class="form-control"
                                type="text" 
                                v-model="model.subHead"
                                placeholder="Enter Sub-Head name"
                            >
                            </b-form-input>
                        </b-form-group>
                        <span v-show="errors.has('createSubHead.subHead')" style="color:#ff7979">{{ errors.first('createSubHead.subHead') }}</span>
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
                            <b-button 
                                type="submit" 
                                size="md" 
                                variant="primary"
                                class="px-4"
                            >
                                <loader v-if="subHeadLoader" />
                                <span v-else>Create</span>
                            </b-button>
                        </b-form-group>
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
                            <tr v-for="(sub, index) in subHeadList" :key="index">
                                <td class="text-center">{{index + 1}}</td>
                                <td class="text-center">
                                    {{sub.HeadName}}
                                </td>
                                <td class="text-center">
                                    <span :id="'name-'+sub._id">
                                        {{sub.subHeadName}}
                                    </span>
                                    <span :id="'inputF-'+sub._id" style="display:none">
                                        <input type="text" class="form-control" :id="'ref-'+sub._id" :value="sub.subHeadName">
                                        <p :id="'msg-'+sub._id" style="display: none; color: #ff7979">
                                            Value Required !
                                        </p>
                                    </span>
                                </td>
                                <td class="text-center">
                                    <b-col sm xs="12" class="text-center mt-3">
                                        <b-button variant="primary" class="btn-pill" @click="edit(sub._id)" :id="'edit-'+sub._id">
                                            <i class="fa fa-pencil"></i>                                   
                                        </b-button>
                                        <b-button variant="success" style="display:none" class="btn-pill" @click="save(sub._id)" :id="'save-'+sub._id">
                                            <i class="fa fa-check"></i>                                   
                                        </b-button>
                                        <b-button variant="danger" style="display:none" class="btn-pill" @click="editClose(sub._id)" :id="'close-'+sub._id">
                                            <i class="fa fa-close"></i>                                   
                                        </b-button>
                                        
                                        <b-button variant="success" class="btn-pill" @click="publish(sub._id, sub.status)">
                                            <i class="fa fa-lock" v-if="sub.status"></i>
                                            <i class="fa fa-unlock" v-else></i>
                                        </b-button>
                                        <b-button variant="danger" class="btn-pill" @click="deletesubHead(sub._id)">
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
        <b-row>
            <b-col sm="5">
                <b-form @submit.prevent="createSubSubHead('submitSubSubHead')" data-vv-scope="submitSubSubHead">
                    <b-card>
                        <div slot="header">
                            <strong>Sub-sub-Head </strong><small>Settings</small>
                        </div>
                        <b-form-group>
                            <label for="company">Sub-Head Name</label>
                            <b-form-select v-model="subhead.subheadName" :plain="true" id="basicSelect">
                                <option value="Please select">-- Please select --</option>
                                <option v-for="(sub, index) in subHeadList" :key="index" :value="sub._id">
                                    {{sub.subHeadName}}
                                </option>
                            </b-form-select>
                        </b-form-group>
                        <b-form-group>
                            <label for="company">Sub-sub-Head Name</label>
                            <b-form-input 
                                name="subSubname" 
                                v-validate="'required|min:2'" 
                                class="form-control"
                                type="text" 
                                v-model="subhead.subSubHead"
                                placeholder="Enter your Sub Subhead Name"
                            >
                            </b-form-input>
                        </b-form-group>
                        <span v-show="errors.has('submitSubSubHead.subSubname')" style="color:#ff7979">{{ errors.first('submitSubSubHead.subSubname') }}</span>
                        <b-form-group>
                            <div class="form-row">
                                <div class="col-sm-2">
                                    Status :
                                </div>
                                <div class="col-sm-8 form-inline">
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" v-model="subhead.subHeadStatus" checked>
                                        <label class="form-check-label" for="inlineRadio1">Active</label>
                                    </div>
                                    <div class="form-check form-check-inline">
                                        <input class="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="0" v-model="subhead.subHeadStatus">
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
                    </b-card>
                </b-form>
            </b-col>
            <b-col sm="7">
                <b-card>
                    <table class="table table-responsive-sm">
                        <thead>
                            <tr>
                                <th class="text-center">SL No</th>
                                <th class="text-center">Sub-Head Name</th>
                                <th class="text-center">Sub-Sub-Head Name</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(subHead, index) in subSubHeadList" :key="index">
                                <td class="text-center">{{index + 1}}</td>
                                <td class="text-center">
                                    {{subHead.subSubCollection[0].subHeadName}}
                                </td>
                                <td class="text-center">
                                    <span :id="'name-'+subHead._id">
                                        {{subHead.subSubHeadName}}
                                    </span>
                                    <span :id="'inputF-'+subHead._id" style="display:none">
                                        <input type="text" class="form-control" :id="'ref-'+subHead._id" :value="subHead.subSubHeadName">
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
                                        <b-button variant="success" style="display:none" class="btn-pill" @click="saveSubHead(subHead._id)" :id="'save-'+subHead._id">
                                            <i class="fa fa-check"></i>                                   
                                        </b-button>
                                        <b-button variant="danger" style="display:none" class="btn-pill" @click="editClose(subHead._id)" :id="'close-'+subHead._id">
                                            <i class="fa fa-close"></i>                                   
                                        </b-button>
                                        
                                        <b-button variant="success" class="btn-pill" @click="publishSubHead(subHead._id, subHead.status)">
                                            <i class="fa fa-lock" v-if="subHead.status"></i>
                                            <i class="fa fa-unlock" v-else></i>
                                        </b-button>
                                        <b-button variant="danger" class="btn-pill" @click="deleteSubSubHead(subHead._id)">
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
import { UPDATE_SUBHEAD, CREATE_SUBHEAD, DELETE_SUBHEAD, UPDATE_STATUS, CREATE_SUBSUBHEAD, UPDATE_SUBSUBHEAD, DELETE_SUBSUBHEAD, UPDATE_SUB_STATUS } from '@store/subHead/actions';

export default {
    name: 'AccountsHead',
    mixins: [formMixin],
    data() {
        return {
            model: {
                head: '-- Please select --',
                subHead: '',
                subHeadStatus: 1
            },
            subhead: {
                subheadName: 'Please select',
                subSubHead: '',
                subHeadStatus: 1
            },
            dismissSecs: 5,
            dismissCountDown: 0,
            varient: 'success',
            subHeadLoader: false
        }
    },
    methods: {
        createSubHead (createSubHead) {
            this.$validator.validateAll(createSubHead).then(isValid => {
                if (!isValid) {
                    return
                }

                this.subHeadLoader = true;
                this.$store.dispatch(CREATE_SUBHEAD, this.model)
                .then((response) => {
                    this.subHeadLoader = false;
                    if(response.data) {
                        this.getSubHeadList();
                    }
                })
                .catch(error => {
                    this.subHeadLoader = false;
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
        },

        createSubSubHead (submitSubSubHead) {
            this.$validator.validateAll(submitSubSubHead).then(isValid => {
                
                if (!isValid) {
                    return 
                }
                this.$store.dispatch(CREATE_SUBSUBHEAD, this.subhead)
                .then((response) => {
                    this.getSubSubHeadList();
                })
                .catch(error => {
                    console.log(error);
                })
            });
        },

        publishSubHead (id, status) {
            this.$store.dispatch(UPDATE_SUB_STATUS, {id, status})
            .then((response) => {
                this.getSubSubHeadList();
            })
            .catch(error => {
                console.log(error);
            })
        },
        deleteSubSubHead (id) {
            this.$store.dispatch(DELETE_SUBSUBHEAD, {id:id})
            .then((response) => {
                this.getSubSubHeadList();
            })
            .catch(error => {
                console.log(error)
            })
        },
        saveSubHead (id) {
            var subSubHead = document.getElementById('ref-'+id).value;
            if (subSubHead) {
                this.toggleLoading()
                this.$store.dispatch(UPDATE_SUBSUBHEAD, {subSubHead, id})
                .then((response) => {
                    
                    if (response.data) {
                        this.getSubSubHeadList();
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
    },
    mounted() {
        this.getSubHeadList();
        this.getSubSubHeadList();
    },
}
</script>