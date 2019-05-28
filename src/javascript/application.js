"use strict";

import Vue from 'vue'

Vue.component('start-view', {
    template: '#start-view',
    props: {
        show: {
            type: Boolean,
        }
    },
    methods: {
        onMoveStageStart: function(e) {
            vm.start = false;
            vm.stage = true;
        },
        onSkip: function(e) {
            window.scrollTo({
                top: 1136,
                behavior: "smooth"
            })
        },
    },
})

Vue.component('stage', {
    template: '#stage',
    props: {
        show: {
            type: Boolean,
        }
    },
    methods: {
        onMoveStageRight: function(e) {
            vm.onMoveStageRight(e);
        },
        onMoveStageLeft: function(e) {
            vm.onMoveStageLeft(e);
        },
        onSkip: function(e) {
            window.scrollTo({
                top: 1136,
                behavior: "smooth"
            })
        },
    }
})
  

const vm = new Vue({
    el: '#app',
    data: function() {
        return {
            start: true,
            stage: false,
            stage2_1: false,
            stage2_2: false,
            stage3_1: false,
            stage3_2: false,
            stage3_3: false,
            result1: false, // 甘えたがり
            result2: false, // 亭主関白
            result3: false, // 恋愛情熱家
            result4: false, // ヤンデレ
            stage_number: '1',
            resultNum: 0
        }
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
            this.stage_number = this.name.slice(5,6)
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
        getRandomInt: function(max) {
            return Math.floor(Math.random() * Math.floor(max));
        },
        onSkip: function(e) {
            window.scrollTo({
                top: 1136,
                behavior: "smooth"
            })
        },
    },
    mounted() {
        this.resultNum = this.getRandomInt(9);
    }
});
