import Vue from 'vue'
import Router from 'vue-router'
import Rhymesaurus from '@/views/Rhymesaurus'
import FollowedBy from '@/views/FollowedBy' 
// TODO: Import new component

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Rhymesaurus',
      component: Rhymesaurus
    },
    {
      path: '/followedby',
      name: 'FollowedBy',
      component: FollowedBy
    }
  
  ]
})
