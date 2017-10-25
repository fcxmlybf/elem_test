<template lang="html">
  <span class="iconMap" :class="iconClassMap[iconType]"></span>
</template>

<script>
    export default {
        props: {
            iconType: Number
        },
        created() {
            this.iconClassMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
        }
    }

</script>

<style lang="scss">
    @import '../../assets/scss/mixin';
    .iconMap{
        display:inline-block;
        background-size:100% 100%;
        background-repeat:no-repeat;
        width:12px;
        height:12px;
        &.decrease{@include bg-image('img/decrease_4@2x.png')};

        &.discount{@include bg-image('img/discount_4@2x.png')};

        &.guarantee{@include bg-image('img/guarantee_4@2x.png')};

        &.invoice{@include bg-image('img/invoice_4@2x.png')};

        &.special{@include bg-image('img/special_4@2x.png')};

    }

</style>
