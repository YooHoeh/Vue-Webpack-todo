/*
 * @Author: YooHoeh 
 * @Date: 2018-07-27 09:05:17 
 * @Last Modified by: YooHoeh
 * @Last Modified time: 2018-07-27 23:39:43
 * @Description: 
 */


<template>
<div id='app'>
  <div id='cover'></div>
  <Header/>
  <Todo/>
  
  <Footer/>
</div>
</template>
<script>
import Header from "./todo/header.vue";
import Footer from "./todo/footer.jsx";
import Tabs from "./todo/tabs.vue";
import Todo from "./todo/todo.vue";
export default {
  components: {
    Header,
    Tabs,
    Todo,
    Footer
  },
  data() {
    return {};
  }
};
</script>
<style lang='stylus' scoped>
#app {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
}

#cover {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #999;
  opacity: 0.9;
  z-index: -1;
}
</style>
