<template>
  <footer class="main-footer">
    <div id='footer'>
      <span>Written by {{author}}</span>
    </div>
  </footer>
</template>

<script>
export default {
  data(){
    return {
      author: 'Qiao'
    }
  }
  
}
</script>
<style lang="stylus" scoped>
 #footer
  margin-top 140px
  text-align center
  color: #bfbfbf
  font-size: 20px
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5)s

</style>




// import '../assets/styles/footer.styl'

// export default {
//   data() {
//     return {
//       author: 'Qiao'
//     }
//   },
//   render() {
//     return (
//       <div id="footer">
//         <span>Written by {this.author}</span>
//       </div>
//     )
//   }
// }