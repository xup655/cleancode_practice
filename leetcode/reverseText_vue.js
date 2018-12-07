let app = new Vue({
  el: '#demo',
  data: {
    DEMO: 'stephanie su',
  },
  methods: {
    reverseDemo_methods: function() {
      return this.DEMO.split('').reverse().join('')
    },
  },
  computed: {
    reverseDemo: function() {
      return this.DEMO.split('').reverse().join('')
    },
    regDemo: function() {
      const reg = new RegExp('s', 'g')
      return this.DEMO.replace(reg, '_')
    }
  }
});