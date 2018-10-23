<template>
  <div>
    <script :id='id' type="text/plain"></script>
  </div>
</template>
<script>

  export default {
    name: 'ue',
    data () {
      return {
        editor: null
      }
    },
    props: {
      value: '',
      config: {},
      id:'',
    },
    mounted () {
      this.$nextTick(()=>{
        
        this.editor = window.UE.getEditor(this.id, this.config)

        // this.editor.addListener('ready', function () {
        //   _this.editor.setContent(_this.value)
        // })
      })
      
    },
    methods: {
      getUEContent () {
        return this.editor.getContent()
      },
      setUEContent (msg) {
        let _this = this
        let setResult;
        this.editor.ready(function() {
          setResult = _this.editor.setContent(msg)
          });
        return setResult
      }
    },
    destroyed () {
      this.editor.destroy()
    }
  }
</script>