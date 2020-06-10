export default {
    code:{
      bind:function(el,binding){
          var flag =true;
          var config = binding.value;
          var text = el.innerHTML
          var time = config.time||59;
          el.addEventListener('click', ()=>{
            if(flag==false) return 
              config.callback && config.callback(inner);
          })
          function inner(){
              flag = false;
                  if(time<=0)
                  {
                      flag=true;
                      time = config.time||59;
                      el.innerHTML = text;
                      return 
                  }
                  el.innerHTML = `重新发送${time}s`
                  time -=1;
                  setTimeout(()=>{
                      inner()
                  },1000)
          }
      
          
      },
      update() {},
      unbind(el, binding) {
        
      }
    },
    /*
      <p v-focus>
        <input/>
      </p>
    
    */ 
    focus: {
      // 当被绑定的元素插入到 DOM 中时……
      inserted: function (el) {
        console.log('jin')
          const windowHeight = window.innerHeight;
          function bindFn(ele){
            console.log('aa')
              if(ele)
              {
                  ele.addEventListener('blur', function () {
                      console.log('a')
                      var windowFocusHeight = window.innerHeight
                      if (windowHeight == windowFocusHeight) {
                        return
                      }
                      var currentPosition;
                      var speed = 1; //页面滚动距离
                      currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
                      currentPosition -= speed;
                      window.scrollTo(0, currentPosition); //页面向上滚动
                      currentPosition += speed; //speed变量
                      window.scrollTo(0, currentPosition); //页面向下滚动
                    })
              }
          }
          // 聚焦元素
          $(el).click(function(){
              $(this).find('input').focus()
              $(this).find('textarea').focus()
              bindFn($(this).find('input')[0])
              bindFn($(this).find('textarea')[0])
              console.log($(this).find('input'))
              return false
          })
          
      },
    },
    // 计时器
    time:{
      inserted:  (el,binding)=> {
        console.log(binding.value)
        if(binding.value.time<0)
        {
          binding.value.callBack && binding.value.callBack()
          $(el).html(`如有问题，请联系客服`);
          return 
        }
        var totalTime =Math.abs(binding.value.time*1000) ;
        //剩23小时59分自动关闭
        
        window.timmer = null;
        
        function timeChange(mss){
          let days = parseInt(mss / (1000 * 60 * 60 * 24));
          let hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          hours =hours<10?('0'+hours):hours
          let minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60));
          minutes = minutes<10?('0'+minutes):minutes
          let seconds = parseInt((mss % (1000 * 60)) / 1000);
          seconds =seconds<10?('0'+seconds):seconds
          return {
            days,
            hours,
            minutes,
            seconds
          }
        }
       
        function inner(totalTime){
          console.log(totalTime)
          let total = totalTime;
          let timmer = 0
          return function inFn(){
            let {days,hours, minutes ,seconds} = timeChange(total);
            console.log(days,hours,minutes,seconds)
            total-=1000;
            if(total<=0)
            {
              clearTimeout(timmer)
             
              window.timmer =0;
              timmer=0;
              if(!minutes)
              {
                $(el).html(`剩余${seconds}秒自动关闭`);
              }
              else
              {
                // $(el).html(`剩余${hours}小时${minutes}分自动关闭`);
                $(el).html(`剩余${minutes}分${seconds}秒自动关闭`);
              }
              binding.value.callBack && binding.value.callBack()
              $(el).html(`如有问题，请联系客服`);
              return 
            }
           
            if(!minutes)
            {
              $(el).html(`剩余${seconds}秒自动关闭`);
            }
            else
            {
              // $(el).html(`剩余${hours}小时${minutes}分自动关闭`);
              $(el).html(`剩余${minutes}分${seconds}秒自动关闭`);
            }
          
            // if(!hours)
            // {
            //   $(el).html(`剩余${minutes}分自动关闭`);
            // }
            // else
            // {
            //   $(el).html(`剩余${hours}小时${minutes}分自动关闭`);
            // }
           
           
            window.timmer = timmer=setTimeout(()=>{
              inFn()
            },1000)
           
          }
        }
       inner(totalTime)()
     
      }
    }
  }


  