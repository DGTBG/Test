<template>
    <div>
        <el-button @click="toEdit()">创建问卷</el-button>
    </div>
</template>
<script>
export default {
    name:'Home',
    data(){
        return{
             userId:0,// 用户id
            
        }
    },
    methods:{
        toEdit(){
            window.localStorage.clear();
           
            this.$router.push({path:'/edit',query:{userId:this.userId}})
        }
    }
}

</script>