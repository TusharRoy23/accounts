<template>
    <div class="animated fadeIn">
        <b-row>
            <b-col sm="6" lg="3">
                <b-card no-body class="bg-primary">
                    <b-card-body class="pb-0">
                        <b-dropdown class="float-right" variant="transparent p-0" right>
                        <template slot="button-content">
                            <i class="icon-settings"></i>
                        </template>
                        <b-dropdown-item>Action</b-dropdown-item>
                        <b-dropdown-item>Another action</b-dropdown-item>
                        <b-dropdown-item>Something else here...</b-dropdown-item>
                        <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                        </b-dropdown>
                        <h4 class="mb-0">9.823</h4>
                        <p>Members online</p>
                    </b-card-body>
                    <card-line1-chart-example chartId="card-chart-01" class="chart-wrapper px-3" style="height:70px;" :height="70"/>
                </b-card>
            </b-col>
            <b-col sm="6" lg="3">
                <b-card no-body class="bg-info">
                    <b-card-body class="pb-0">
                        <b-dropdown class="float-right" variant="transparent p-0" right no-caret>
                        <template slot="button-content">
                            <i class="icon-location-pin"></i>
                        </template>
                        <b-dropdown-item>Action</b-dropdown-item>
                        <b-dropdown-item>Another action</b-dropdown-item>
                        <b-dropdown-item>Something else here...</b-dropdown-item>
                        <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                        </b-dropdown>
                        <h4 class="mb-0">9.823</h4>
                        <p>Members online</p>
                    </b-card-body>
                    <card-line2-chart-example chartId="card-chart-02" class="chart-wrapper px-3" style="height:70px;" :height="70"/>
                </b-card>
            </b-col>
            <b-col sm="6" lg="3">
                <b-card no-body class="bg-warning">
                    <b-card-body class="pb-0">
                        <b-dropdown class="float-right" variant="transparent p-0" right>
                        <template slot="button-content">
                            <i class="icon-settings"></i>
                        </template>
                        <b-dropdown-item>Action</b-dropdown-item>
                        <b-dropdown-item>Another action</b-dropdown-item>
                        <b-dropdown-item>Something else here...</b-dropdown-item>
                        <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                        </b-dropdown>
                        <h4 class="mb-0">9.823</h4>
                        <p>Members online</p>
                    </b-card-body>
                    <card-line3-chart-example chartId="card-chart-03" class="chart-wrapper" style="height:70px;" height="70"/>
                </b-card>
            </b-col>
            <b-col sm="6" lg="3">
                <b-card no-body class="bg-danger">
                    <b-card-body class="pb-0">
                        <b-dropdown class="float-right" variant="transparent p-0" right>
                        <template slot="button-content">
                            <i class="icon-settings"></i>
                        </template>
                        <b-dropdown-item>Action</b-dropdown-item>
                        <b-dropdown-item>Another action</b-dropdown-item>
                        <b-dropdown-item>Something else here...</b-dropdown-item>
                        <b-dropdown-item disabled>Disabled action</b-dropdown-item>
                        </b-dropdown>
                        <h4 class="mb-0">9.823</h4>
                        <p>Members online</p>
                    </b-card-body>
                    <card-bar-chart-example chartId="card-chart-04" class="chart-wrapper px-3" style="height:70px;" height="70"/>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>
<script>
export default {
    name: 'Dashboard'
}
</script>