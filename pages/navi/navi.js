var QQMapWX = require('libs/qqmap-wx-jssdk.js');
var mqtt = require('../../utils/mqtt.min.js')
const app = getApp()
var username;
var password;
var qqmapsdk;
var mapCtx;
var markers = [{
    id: 686917010528095,
    // iconPath:"../images/icon_bus_blue.png",
    latitude: 36.66026,
    longitude: 117.04952,
    // alpha:0,
    callout: {
      content: "1号：鲁AB3270\n司机：孙师傅\n电话：13518610145",
      padding: 10,
      display: 'BYCLICK',
      textAlign: 'center',
      borderRadius: 5
    }
  },
  {
    id: 686917010511901,
    latitude: 36.660362,
    // iconPath: "../images/icon_bus_blue.png",
    longitude: 117.049866,
    callout: {
      content: "2号：鲁AB1790\n司机：董师傅\n电话：13953188026",
      padding: 10,
      display: 'BYCLICK',
      textAlign: 'center',
      borderRadius: 5,
    }
  },
  {
    id: 686917010528491,
    latitude: 36.66031,
    // iconPath: "../images/icon_bus_blue.png",
    longitude: 117.04963,
    callout: {
      content: "3号：鲁AA1936\n司机：赵师傅\n电话：15069186991",
      padding: 10,
      display: 'BYCLICK',
      textAlign: 'center',
      borderRadius: 5
    }

  },
  {
    id: 686917010511935,
    latitude: 36.660294,
    // iconPath: "../images/icon_bus_blue.png",
    longitude: 117.04936,
    callout: {
      content: "4号：鲁AH1556\n司机：陈师傅\n电话：13105316566",
      padding: 10,
      display: 'BYCLICK',
      textAlign: 'center',
      borderRadius: 5
    }

  },
  {
    id: 686917010511661,
    latitude: 36.660316,
    // iconPath: "../images/icon_bus_blue.png",
    longitude: 117.04921,
    callout: {
      content: "5号：鲁AH1557\n司机：李师傅\n电话：15054166381",
      padding: 10,
      display: 'BYCLICK',
      textAlign: 'center',
      borderRadius: 5
    }
  },
  {
    id: 686917010528202,
    // iconPath: "../images/icon_bus_blue.png",
    latitude: 36.66036,
    longitude: 117.04971,
    callout: {
      content: "6号：鲁AB3237\n司机：许师傅\n电话：13953197978",
      padding: 10,
      display: 'BYCLICK',
      textAlign: 'center',
      borderRadius: 5
    }
  },
  {
    id: 686917010511521,
    // iconPath: "../images/icon_bus_blue.png",
    latitude: 36.660248,
    longitude: 117.04961,
    callout: {
      content: "7号：鲁AA1937\n司机：张师傅\n电话：18764189899",
      padding: 10,
      display: 'BYCLICK',
      textAlign: 'center',
      borderRadius: 5
    }

  },
  {
    id: 686917010511737,
    // iconPath: "../images/icon_bus_blue.png",
    latitude: 36.54843,
    longitude: 116.841606,
    callout: {
      content: "8号：鲁A18597\n司机：陈师傅\n电话：15668373552",
      padding: 10,
      display: 'BYCLICK',
      textAlign: 'left',
      borderRadius: 5
    }
  },
  {
    id: 686917010511638,
    // iconPath: "../images/icon_bus_blue.png",
    latitude: 36.660313,
    longitude: 117.04914,
    callout: {
      content: "9号：鲁A18207\n司机：张师傅\n电话：13864030555",
      padding: 10,
      display: 'BYCLICK',
      textAlign: 'center',
      borderRadius: 5
    }
  },
  {
    id: 686917010522544,
    // iconPath: "../images/icon_bus_blue.png",
    latitude: 36.657448,
    longitude: 116.91461,
    callout: {
      content: "10号：鲁AB1720\n司机：邢师傅\n电话：13515412851",
      padding: 10,
      display: 'BYCLICK',
      textAlign: 'center',
      borderRadius: 5
    }

  },
  {
    id: 686917010528129,
    // iconPath: "../images/icon_bus_blue.png",
    latitude: 36.66035,
    longitude: 117.04992,
    callout: {
      content: "13号：鲁A17565\n司机：胡师傅\n电话：15806668618",
      padding: 10,
      display: 'BYCLICK',
      textAlign: 'center',
      borderRadius: 5
    }

  },
  {
    id: 686917010523864,
    // iconPath: "../images/icon_bus_blue.png",
    latitude: 36.655327,
    longitude: 116.96216,
    callout: {
      content: "11号：鲁AB5678\n司机：韩师傅\n电话：13210508654",
      padding: 10,
      display: 'BYCLICK',
      textAlign: 'center',
      borderRadius: 5
    }
  },
  {
    id: 686917010523856,
    // iconPath: "../images/icon_bus_blue.png",
    latitude: 36.655327,
    longitude: 116.96216,
    callout: {
      content: "12号:鲁AB569\n司机：刑师傅\n电话：13854119118",
      padding: 10,
      display: 'BYCLICK',
      textAlign: 'center',
      borderRadius: 5
    },


  },
];
Page({
  data: {
    username: '',
    password: '',
    latitude: 36.5464836864,
    longitude: 116.8323898315,
    markers: markers,
    mapWidth: '',
    mapHeight: ''
  },
  toaddress: function(e) {
    console.log(e)
    var id = e.markerId
    console.log(id)

  },
  onReady: function(e) {
    // this.mapCtx = wx.createMapContext('myMap')
  },
  onShow: function(options) {
    var time = Date.now();
    console.log("time2", time)
    this.mapCtx = wx.createMapContext('myMap')
    var that = this;
    wx.request({
      url: 'http://bus.mysdnu.cn/bus/mqtt',
      method: 'GET',
      data: {
        666: time
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        console.log(res.data.username);
        console.log(res.data.password);
        that.setData({
          username: res.data.username,
          password: res.data.password,
        })
      }
    });
    options = {
      reconnectPeriod: 3000,
      connectTimeout: 8000,
      clientId: time,
      username: username,
      password: password,
    }
    const client = mqtt.connect('wx://bus.mysdnu.cn:80/mqtt', options)
    client.on('reconnect', (error) => {
      console.log('正在重连:', error)
      console.log("time2", time)
    })

    client.on('error', (error) => {
      console.log('连接失败:', error)
    })

    client.on('connect', (e) => {
      console.log('成功连接服务器')
      //订阅一个主题
      client.subscribe("BusMove", "BusMoveList", function(err) {
        if (!err) {
          console.log("订阅成功")
        }
      })
    })
    client.on('message', function(topic, message, packet) {
      // message is Buffer 
      console.log("连接前")
      console.log("packet", packet.payload.toString())
      console.log("连接后")

      if (packet.payload.toString() != null) {
        let obj = JSON.parse(packet.payload.toString())
        if (obj[686917010528095] == undefined) {} else {
          // markers[0].latitude = obj[686917010528095].lat,
          //   markers[0].longitude = obj[686917010528095].lng
          that.mapCtx.translateMarker({
            markerId: 686917010528095,
            autoRotate: true,
            duration: 2000,
            destination: {
              latitude: obj[686917010528095].lat,
              longitude: obj[686917010528095].lng,
            },
            animationEnd() {
              console.log('animation end')
            }
          });
          console.log("1号车的位置改变了吗")
        };
        if (obj[686917010511901] == undefined) {} else {
          // markers[1].latitude = obj[686917010511901].lat,
          //   markers[1].longitude = obj[686917010511901].lng
          that.mapCtx.translateMarker({
            markerId: 686917010511901,
            autoRotate: true,
            duration: 2000,
            destination: {
              latitude: obj[686917010511901].lat,
              longitude: obj[686917010511901].lng,
            },
            animationEnd() {
              console.log('animation end')
            }
          });
          console.log("2号车的位置改变了吗")
        };
        if (obj[686917010528491] == undefined) {} else {
          // markers[2].latitude = obj[686917010528491].lat,
          //   markers[2].longitude = obj[686917010528491].lng
          that.mapCtx.translateMarker({
            markerId: 686917010528491,
            autoRotate: true,
            duration: 2000,
            destination: {
              latitude: obj[686917010528491].lat,
              longitude: obj[686917010528491].lng,
            },
            animationEnd() {
              console.log('animation end')
            }
          });
          console.log("3号车的位置改变了吗")
        };
        if (obj[686917010511935] == undefined) {} else {
          // markers[3].latitude = obj[686917010511935].lat,
          //   markers[3].longitude = obj[686917010511935].lng
          that.mapCtx.translateMarker({
            markerId: 686917010511935,
            autoRotate: true,
            duration: 2000,
            destination: {
              latitude: obj[686917010511935].lat,
              longitude: obj[686917010511935].lng,
            },
            animationEnd() {
              console.log('animation end')
            }
          });
          console.log("4号车的位置改变了吗")
        };
        if (obj[686917010511661] == undefined) {} else {
          // markers[4].latitude = obj[686917010511661].lat,
          //   markers[4].longitude = obj[686917010511661].lng
          that.mapCtx.translateMarker({
            markerId: 686917010511661,
            autoRotate: true,
            duration: 2000,
            destination: {
              latitude: obj[686917010511661].lat,
              longitude: obj[686917010511661].lng,
            },
            animationEnd() {
              console.log('animation end')
            }
          });
          console.log("5号车的位置改变了吗")
        };
        if (obj[686917010528202] == undefined) {} else {
          // markers[686917010528202].iconPath = "../images/icon_bus_red.png" 
          // markers[5].latitude = obj[686917010528202].lat,
          //   markers[5].longitude = obj[686917010528202].lng
          that.mapCtx.translateMarker({
            markerId: 686917010528202,
            autoRotate: true,
            duration: 2000,
            destination: {
              latitude: obj[686917010528202].lat,
              longitude: obj[686917010528202].lng,

            },
            animationEnd() {
              console.log('animation end')
            }
          });
          console.log("6号车的位置改变了吗")
        };
        if (obj[686917010511521] == undefined) {} else {
          // markers[6].latitude = obj[686917010511737].lat,
          //   markers[6].longitude = obj[686917010511737].lng
          that.mapCtx.translateMarker({
            markerId: 686917010511521,
            autoRotate: true,
            duration: 2000,
            destination: {
              latitude: obj[686917010511521].lat,
              longitude: obj[686917010511521].lng,
            },
            animationEnd() {
              console.log('animation end')
            }
          });
          console.log("7号车的位置改变了吗")
        };
        if (obj[686917010511737] == undefined) {} else {
          // markers[7].latitude = obj[686917010511737].lat,
          //   markers[7].longitude = obj[686917010511737].lng
          that.mapCtx.translateMarker({
            markerId: 686917010511737,
            autoRotate: true,
            duration: 2000,
            destination: {
              latitude: obj[686917010511737].lat,
              longitude: obj[686917010511737].lng,
            },
            animationEnd() {
              console.log('animation end')
            }
          });
          console.log("8号车的位置改变了吗")
        };
        if (obj[686917010511638] == undefined) {} else {
          // markers[8].latitude = obj[686917010511638].lat,
          //   markers[8].longitude = obj[686917010511638].lng
          that.mapCtx.translateMarker({
            markerId: 686917010511638,
            autoRotate: true,
            duration: 2000,
            destination: {
              latitude: obj[686917010511638].lat,
              longitude: obj[686917010511638].lng,
            },
            animationEnd() {
              console.log('animation end')
            }
          });
          console.log("9号车的位置改变了吗")
        };
        if (obj[686917010522544] == undefined) {} else {
          // markers[9].latitude = obj[686917010522544].lat,
          //   markers[9].longitude = obj[686917010522544].lng
          that.mapCtx.translateMarker({
            markerId: 686917010522544,
            autoRotate: true,
            duration: 2000,
            destination: {
              latitude: obj[686917010522544].lat,
              longitude: obj[686917010522544].lng,
            },
            animationEnd() {
              console.log('animation end')
            }
          });
          console.log("10号车的位置改变了吗")
        };
        if (obj[686917010528129] == undefined) {} else {
          // markers[10].latitude = obj[686917010528129].lat,
          //   markers[10].longitude = obj[686917010528129].lng
          that.mapCtx.translateMarker({
            markerId: 686917010528129,
            autoRotate: true,
            duration: 2000,
            destination: {
              latitude: obj[686917010528129].lat,
              longitude: obj[686917010528129].lng,
            },
            animationEnd() {
              console.log('animation end')
            }
          });
          console.log("13号车的位置改变了吗")
        };
        if (obj[686917010523856] == undefined) {} else {
          // markers[11].latitude = obj[686917010523856].lat,
          //   markers[11].longitude = obj[686917010523856].lng
          that.mapCtx.translateMarker({
            markerId: 686917010523856,
            autoRotate: true,
            duration: 2000,
            destination: {
              latitude: obj[686917010523856].lat,
              longitude: obj[686917010523856].lng,
            },
            animationEnd() {
              console.log('animation end')
            }
          });
          console.log("12号车的位置改变了吗")
        };
        if (obj[686917010523864] == undefined) {} else {
          // markers[12].latitude = obj[686917010523864].lat,
          //   markers[12].longitude = obj[686917010523864].lng
          that.mapCtx.translateMarker({
            markerId: 686917010523864,
            autoRotate: true,
            duration: 2000,
            destination: {
              latitude: obj[686917010523864].lat,
              longitude: obj[686917010523864].lng,
            },
            animationEnd() {
              console.log('animation end')
            }
          });
          console.log("11号车的位置改变了吗")
        };
      }
    })
  },
  call: function(e) {
    var phone;
    switch (e.markerId) {
      case 686917010528095:
        phone = "13518610145";
        break;
      case 686917010511901:
        phone = "13953188026";
        break;
      case 686917010528491:
        phone = "15069186991";
        break;
      case 686917010511935:
        phone = "13105316566";
        break;
      case 686917010511661:
        phone = "15054166381";
        break;
      case 686917010528202:
        phone = "13953197978";
        break;
      case 686917010511521:
        phone = "18764189899";
        break;
      case 686917010511737:
        phone = "15668373552";
        break;
      case 686917010511638:
        phone = "13864030555";
        break;
      case 686917010522544:
        phone = "13515412851";
        break;
      case 686917010528129:
        phone = "15806668618";
        break;
      case 686917010523856:
        phone = "13854119118";
        break;
      case 686917010523864:
        phone = "13210508654";
        break;
      default:
        console.log("错误");
        break;

    }
    wx.showModal({
      title: "提示",
      content: "您确定要给司机打电话吗？",
      success(res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '17861401814'
          })
        }
      }
    })

  },
move:function(e){
  this.mapCtx.moveToLocation()
},
center:function(e){
  wx.navigateTo({
    url: '/pages/user/user',
  })
},
  orderbus: function(e) {
    console.log("hello")
    wx.getLocation({
      type: 'wgs84',
      success(res) {
        const latitude = res.latitude
        const longitude = res.longitude
        console.log(latitude)
        console.log(longitude)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var sy = wx.getSystemInfoSync(),
      mapWidth = sy.windowWidth * 2,
      mapHeight = sy.windowHeight * 2;
    this.setData({
      mapWidth: mapWidth,
      mapHeight: mapHeight
    });
  }
})