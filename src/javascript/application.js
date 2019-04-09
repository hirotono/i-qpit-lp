"use strict";

import Vue from 'vue'
window.app = new Vue({
    el: '#app',
    data: {
        stage: true,
        stage2_1: false,
        stage2_2: false,
        stage3_1: false,
        stage3_2: false,
        stage3_3: false,
    },
    methods: {
        onMoveStageRight: function(e) {
            if (this.name) {
                this.$data[this.name] = false;
            } else {
                this.stage = false
            }
            this.name = e.target.name;
            this.$data[this.name] = true;
        },
        onMoveStageLeft: function(e) {
            if (this.name) {
                this.$data[this.name] = false;
            } else {
                this.stage = false
            }
            this.name = e.target.name;
            this.$data[this.name] = true;
        },
    },
    mounted: function () {
        console.log(this._data)
    }
});