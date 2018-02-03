<template>
  <transition-group name="list">
    <slot name="section-list"></slot>
  </transition-group>
</template>

<style>
  .list-enter-active, .list-leave-active {
    transition: all .5s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateX(300px);
  }
</style>
