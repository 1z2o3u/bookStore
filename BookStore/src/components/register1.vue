<template>
    <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" >
        <el-form-item label="电话号码：" prop="">
        <el-input v-model.number="ruleForm2.phone"></el-input>
        </el-form-item>
        <el-form-item label="验证码：" prop="">
        <el-input v-model.number="ruleForm2.nickname"></el-input>
          <button>获取验证码</button>
        </el-form-item>
        <el-form-item label="昵称：" prop="">
        <el-input v-model.number="ruleForm2.nickname"></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pass"  >
        <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码：" prop="checkPass">
        <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
        <el-button  class='register' type="primary" @click="submitForm('ruleForm2')">注册</el-button>
        <!-- <el-button @click="resetForm('ruleForm2')">重置</el-button> -->
        </el-form-item>   
    </el-form>
</template>

<script>
export default {
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('年龄不能为空'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          } else {
            if (value < 18) {
              callback(new Error('必须年满18岁'));
            } else {
              callback();
            }
          }
        }, 1000);
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm2.checkPass !== '') {
            this.$refs.ruleForm2.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm2.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          age: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          age: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      }
    }
  }
</script>

<style lang="scss" >
    .el-form-item{
        width:520px;
    }
    .el-input__inner{
      width:300px;
      height: 45px;
    }
    .el-input{
         width:300px;
    }

    .el-form-item__label{
      // padding-right: 0;

    }

    .el-form-item__content{
      text-align: left;
      margin-left:0px;
    }

    .el-button{
          width: 100px;
          height: 50px;
          // margin-left: 30px; 
          font-size: 20px;
    }

    .el-form{
        text-align: left;
        width: 800px;
        margin: 50px 600px;
    }

      button{
            width:100px;
            height:32px;
            background: rgb(68, 235, 26);
            border:none;
            color:#fff;
        }

     .container{
        text-align: left;
        width: 800px;
        margin: 50px 600px;
        label{
            font-size:20px;
        }
        input{
            margin-bottom: 20px;
            width:300px;
            height:40px;
            border: 1px solid rgb(223, 215, 215);
        }
        button{
            width:100px;
            height:42px;
            background: rgb(68, 235, 26);
            border:none;
            color:#fff;
        }
        .register{
            width: 360px;
            height: 50px;
            margin-left: 30px;
            font-size: 20px;
            // font-weight: 800;
        }
        .login{
            margin-top: 50px;
            text-align: center;
            a{
                color: rgb(0, 89, 255);
            }
        }
    }
</style>


