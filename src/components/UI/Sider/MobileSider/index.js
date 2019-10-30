import React, { useState } from 'react';
import { Layout } from 'antd'

const { Sider } = Layout;
const MobileSider = ({ children }) => {

  const [collapse, setCollapse] = useState(false)
  return (
    <Sider
      className="mobile-sider"
      collapsible
      collapsed={collapse}
      breakpoint="lg"
      onCollapse={() => setCollapse(!collapse)}
      theme="light"
      collapsedWidth="0"
      style={{
        minHeight: '100vh',
        left: 0
      }}
    >
      {children}
    </Sider>
  )
}
export default MobileSider