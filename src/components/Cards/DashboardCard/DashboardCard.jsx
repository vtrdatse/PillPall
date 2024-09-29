import { Card, Col, Row, Typography } from 'antd';
import React from 'react';

function DashboardCard({ title, value, icon }) {
    const { Title } = Typography;
    return (
        <Col
            xs={24}
            sm={24}
            md={12}
            lg={6}
            xl={6}
            className="mb-24"
        >
            <Card bordered={false} className="criclebox ">
                <div className="number">
                    <Row align="middle" gutter={[24, 0]}>
                        <Col xs={18}>
                            <span>{title}</span>
                            <Title level={3}>
                                {value}
                            </Title>
                        </Col>
                        <Col xs={6}>
                            <div className="icon-box">{icon}</div>
                        </Col>
                    </Row>
                </div>
            </Card>
        </Col>

    );
}

export default DashboardCard;