import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import './index.scss'

class ContentNav extends React.Component {
    render() {
        const con = this.props.con
        console.log(con, "con")
        return (
            <div className="flex">
                {
                    con.map((item, index) => {
                        return (
                            <div className="sancan_swiper_item" key={index}>
                                <a href="###" className="sancan_item">
                                    <img src={item.img} className="image" />
                                    <div className="text">{item.title}</div>
                                    <div className="yyw">
                                        <div className="t">"养"</div>
                                        <div className="des">{item.dec}</div>
                                    </div>
                                </a>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export default ContentNav