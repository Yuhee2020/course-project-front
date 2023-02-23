import React from 'react';
import {Button, Card, Tooltip} from "antd";
import {
    DeleteOutlined,
    LockOutlined,
    UnlockOutlined,
    UserOutlined
} from "@ant-design/icons";
import {
    changeUsersRoleTC,
    deleteUsersTC,
    updateUsersTC
} from "../../../store/reducers/usersReducer";
import {useAppDispatch} from "../../../store/reducers/Store";
import s from "./Toolbar.module.css"
import {useTranslation} from "react-i18next";

type PropsType = {
    usersId: string[]
}

export const Toolbar = ({usersId}: PropsType) => {

    const dispatch = useAppDispatch()
    const {t} = useTranslation();

    const handleDeleteClick = () => {
        dispatch(deleteUsersTC(usersId))
    }
    const handleBlockClick = () => {
        dispatch(updateUsersTC(usersId.map(id => ({id, isBlocked: true}))))
    }
    const handleUnlockClick = () => {
        dispatch(updateUsersTC(usersId.map(id => ({id, isBlocked: false}))))
    }
    const handleChangeRoleClick = () => {
        dispatch(changeUsersRoleTC(usersId))
    }
    return (
        <Card className={s.cardBox}>
            <div className={s.toolbarContainer}><Tooltip title={t('deleteUser')}
                                                         placement="bottom">
                <Button type="primary" onClick={handleDeleteClick}
                        icon={<DeleteOutlined/>}
                        size="large"/>
            </Tooltip>
                <Tooltip title={t('blockUser')} placement="bottom">
                    <Button type="primary"
                            onClick={handleBlockClick} icon={<LockOutlined/>}
                            size="large"/>
                </Tooltip>
                <Tooltip title={t('unlockUser')} placement="bottom">
                    <Button type="primary"
                            onClick={handleUnlockClick} icon={<UnlockOutlined/>}
                            size="large"/>
                </Tooltip>
                <Button onClick={handleChangeRoleClick} type="primary"
                        icon={<UserOutlined/>}
                        size="large">
                    {t("changeRole")}
                </Button>
            </div>
        </Card>
    );
};
