import React from 'react';
import s from "./UserProfile.module.css";
import {Avatar, Card} from "antd";
import Meta from "antd/es/card/Meta";
import {UserType} from "../../../api/authApi";
import {useTranslation} from "react-i18next";
import {CollectionModal} from "../collectionModal/CollectionModal";

type PropsType = {
    user: UserType | null
}

export const UserProfile = ({user}: PropsType) => {
    const {t} = useTranslation();

    return (
        <Card
            className={s.profileBox}
            cover={
                <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                />
            }
            actions={[
                <CollectionModal userId={user?._id}/>,
            ]}
        >
            <Meta
                avatar={<Avatar/>}
                title={user?.email}
                description={<>
                    <div>{`${t("role")}: ${user?.role}`}</div>
                </>}
            />
        </Card>
    );
};

