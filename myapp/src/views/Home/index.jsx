import React from 'react';
import { SearchBar, Button, WhiteSpace, Carousel, WingBlank, Icon, View, Tabs } from 'antd-mobile';
import SwiperCore, { Virtual,Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.scss';
import 'swiper/swiper.scss';
import 'swiper/components/pagination/pagination.scss';
import ContentNav from './ContentNav';


SwiperCore.use([Virtual, Pagination,Swiper]);
class Home extends React.Component{
    state={
        imgHeight: document.body.scrollWidth*0.85,
        data:[
            {
                title:"啤酒炖鱼",
                style:{
                    background:`url(${require("../../img/banner1.jpg")}) center center /cover no-repeat`    
                },
                author:'https://st-cn.meishij.net/user/143/54/t3701143_154442408935113.jpg',
                authorname:"石榴树2008"
            },
            {
                title:"手撕包菜",
                style:{
                    background:`url(${require("../../img/banner2.jpg")}) center center /cover no-repeat`    
                },
                author:'https://st-cn.meishij.net/user/143/54/t3701143_154442408935113.jpg',
                authorname:"石榴树2008"
            },
            {
                title:"仙女瘦身汤",
                style:{
                    background:`url(${require("../../img/banner3.jpg")}) center center /cover no-repeat`    
                },
                author:'https://st-cn.meishij.net/user/143/54/t3701143_154442408935113.jpg',
                authorname:"石榴树2008"
            }
        ],
        tabs:[
            { title: '早餐', key: 't1', 
            content:[{tiele:"早餐汤包",
            img:"https://st-cn.meishij.net/r/246/137/1534496/s1534496_65833.jpg",
            dec:"营养丰富，早餐最爱"},
            {tiele:"柔软素大包",
            img:"https://st-cn.meishij.net/r/246/137/1534496/s1534496_65833.jpg",
            dec:"简单快手，分分钟搞定"}] },
            { title: '午餐', key: 't2' ,
            content:[{tiele:"早餐汤包",
            img:"https://st-cn.meishij.net/r/246/137/1534496/s1534496_65833.jpg",
            dec:"营养丰富，早餐最爱"},
            {tiele:"柔软素大包",
            img:"https://st-cn.meishij.net/r/246/137/1534496/s1534496_65833.jpg",
            dec:"简单快手，分分钟搞定"}] },
            { title: '下午茶', key: 't3',
            content:[{tiele:"早餐汤包",
            img:"https://st-cn.meishij.net/r/246/137/1534496/s1534496_65833.jpg",
            dec:"营养丰富，早餐最爱"},
            {tiele:"柔软素大包",
            img:"https://st-cn.meishij.net/r/246/137/1534496/s1534496_65833.jpg",
            dec:"简单快手，分分钟搞定"}] },
            { title: '晚餐', key: 't4',
            content:[{tiele:"早餐汤包",
            img:"https://st-cn.meishij.net/r/246/137/1534496/s1534496_65833.jpg",
            dec:"营养丰富，早餐最爱"},
            {tiele:"柔软素大包",
            img:"https://st-cn.meishij.net/r/246/137/1534496/s1534496_65833.jpg",
            dec:"简单快手，分分钟搞定"}] },
            { title: '宵夜', key: 't5',
            content:[{tiele:"早餐汤包",
            img:"https://st-cn.meishij.net/r/246/137/1534496/s1534496_65833.jpg",
            dec:"营养丰富，早餐最爱"},
            {tiele:"柔软素大包",
            img:"https://st-cn.meishij.net/r/246/137/1534496/s1534496_65833.jpg",
            dec:"简单快手，分分钟搞定"}] },
        ],
        fenlei:[
            { title: '推荐', key: 't1'},
            { title: '时令', key:'t2'},
            { title: '食肉', key:'t3'},
            { title: '素食', key:'t4'},
            { title: '烘焙', key:'t5'},

        ],
        currentIndex:1,
        newCurrent:0,
        tuijian:[]
    }
    hangeindex=(index)=>{
        this.setState({
            currentIndex:index
        })
    }
    changeindex=(index)=>{
        this.setState({
            newCurrent:index
        })
    }
   
    render(){ console.log("data",this.state.data)
    const {tabs,imgHeight,data,fenlei } = this.state;
    let {currentIndex,newCurrent} = this.state;
        return (
           
            <div className='home'>
                <div className='topsearchw'><div className="topsearch"><a><Icon type="search" size={"xs"} /><span>搜索百万免费菜谱</span></a></div></div>
                <div className="titlesw">
                    <h3 className="title_s2">今日热门</h3>
                </div>
                <div className="conlw">
                    <Swiper
                      spaceBetween={12}
                      slidesPerView={1.2}
                      slidesOffsetBefore={12}
                      slidesOffsetAfter={12}
                      style={{height:imgHeight,backgroundColor:"#fff"}}
                      virtual
                    //   pagination={{ clickable: true }}
                    //   scrollbar={{ draggable: true }}
                    //   onSlideChange={() => console.log('slide change')}
                    //   onSwiper={(swiper) => console.log(swiper)}
                    >
                        
                    {data.map((item,index)=>{
                        return(
                            <SwiperSlide key={item+index}>
                                <a href="###" className="link" >
                                    <div className="banner" style={item.style} >
                                        <h4 className="t">{item.title}</h4>
                                        <div className="author">
                                            <img src={item.author} className="avatar"/>
                                            <span className="authorname">{item.authorname}</span>
                                        </div>
                                    </div>
                                </a>
                            </SwiperSlide>
                        )
                        
                    })
                    }  
                    </Swiper>
                </div>
                <div className="titlesw">
                    <h3 className="title_s2">为你推荐</h3>
                </div>
                <div className="tjlinksw">
                    <div className="tjlink tjlink_spe">
                        <a href="###" className="tjitem">
                            <strong>每日优惠</strong>
                        </a>
                    </div>
                    <div className="tjlink">
                        <a href="###" className="tjitem">
                            <strong>食材大选</strong>
                        </a>
                    </div>
                    <div className="tjlink">
                        <a href="###" className="tjitem">
                            <strong>热门专题</strong>
                        </a>
                    </div>
                    <div className="tjlink">
                        <a href="###" className="tjitem">
                            <strong>菜谱分类</strong>
                        </a>
                    </div>
                    <div className="tjlink">
                        <a href="###" className="tjitem">
                            <strong>本周流行</strong>
                        </a>
                    </div>
                    <div className="tjlink">
                        <a href="###" className="tjitem">
                            <strong>视频菜谱</strong>
                        </a>
                    </div>
                </div>
                <div className="titlesw">
                    <h4 className="title_s1">每日三餐</h4>
                    <div className="sc_titlew">
                        <div className="sc_titlew_scroller" id="sancan_nt">
                            {
                               tabs.map((item,index)=>{
                                    return(
                                        <span data-tab="0" onClick={()=>{this.hangeindex(index)}} key={item.key} className={`t ${item.key} ${index===currentIndex?"current":" "}`}>
                                            <em>{item.title}</em>
                                        </span>
                                    )
                               })
                            }
                            <div>
                            <Swiper
                              spaceBetween={12}
                              slidesPerView={1}
                              slidesOffsetBefore={12}
                              slidesOffsetAfter={12}
                              pagination={{el:'.sc_titlew_scroller',loop:true,type:"custom",clickable: true,renderCustom:function(swiper,current,total){

                              }}}
                              virtual
                              onSlideChange={() => console.log('slide change')}
                              onSwiper={(swiper) => console.log(swiper)}
                            >
                                
                            {
                                tabs.map((item,index)=>{
                                    return(
                                        <SwiperSlide>
                                            <ContentNav key={index} con={item.content} />
                                        </SwiperSlide>
                                    )
                                })
                            }
                            </Swiper>
                            </div>
                        </div>
                    </div>
                </div>
                <Swiper
                    pagination={{ clickable: true }}
                    loop={true}
                >
                  <SwiperSlide><div className="imgbanner"><img src="https://st-cn.meishij.net/p2/20201030/20201030180302_679.jpg" style={{ display:"block",width:"100%" }}/></div></SwiperSlide>
                  <SwiperSlide><div className="imgbanner"><img src="https://st-cn.meishij.net/p2/20201029/20201029205121_632.jpg" style={{ display:"block",width:"100%" }}/></div></SwiperSlide>
                  <SwiperSlide><div className="imgbanner"><img src="https://st-cn.meishij.net/p2/20201029/20201029165331_632.jpg" style={{ display:"block",width:"100%" }}/></div></SwiperSlide>
                </Swiper>
                <div className="titlesw">
                    <h4 className="title_s1">大家都在做</h4>               
                    <div className="sc_titlew">
                        <div className="sc_titlew_scroller" id="sancan_nt">
                            {
                               fenlei.map((item,index)=>{
                                    return(
                                        <span data-tab="0" onClick={()=>{this.changeindex(index)}} key={item.key} className={`t ${item.key} ${index===newCurrent?"current":" "}`}>
                                            <em>{item.title}</em>
                                        </span>
                                    )
                               })
                            }
                            </div>
                        </div>
                    </div>
                    <ContentNav></ContentNav>
                </div>
        )
    }
}
export default Home