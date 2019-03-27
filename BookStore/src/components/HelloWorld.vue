<template>
  <div class="hello">
          <img :src='"../../static/uploads/"+avatar' alt="">
          <!-- <img src="../../../back/static/uploads/1550828243529.jpg" alt=""> -->
 
          <input type="file" @change="getFile($event)" placeholder="请点击" class="edit" oooo>
    
  </div>
</template>

<script>
export default {
   mounted() {
        // this.init();
    },
    methods: {
// 这个接口是获取用户信息的
        init() {
            this.$axios.post('http://localhost:3000/iamge',{},{}).then((response) => {
                var res = response.data;
                console.log(res,'LLLLLLLLLLLLLLLLLLLLL')
                this.username = res.username
                this.avatar = res.avatar
            })
        },
      
          getFile(event) {
            this.file = event.target.files[0];  //获取上传元素信息
            var that = this
            event.preventDefault();
            // 只能通过formData方式来传输文件
            var formData = new FormData();  
            formData.append('file', this.file);

            let config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            this.$axios.post('http://localhost:3000/image', formData, config).then(function(res) {
                console.log(res.data.avatar,'OOOOOOOOO')
                if (res.data.code == 1) {
                    /*这里做处理*/  
                     that.avatar = res.data.avatar
                    // that.init();  //   给avatar赋上新的值，否则要刷新获取
                }
            })
          },
    },
    data() {
          return {
            avatar: '',
          }
    }

}
</script>

<style lang="scss" scoped>
  .hello{
    height: 300px;
    background: yellow;
    position: relative;
    // .edit{
    //   color: transparent;
    //   background: green;
    //   width: 80px;
    //   height: 300px;
    //   // text-indent: -100;
    //   position: absolute;
    //   top:-10px;
    //   left:0;
    // }
  }
</style>


