import React, {useState} from 'react';
import {Button, Modal} from "antd";
import {AppstoreAddOutlined, EditOutlined} from "@ant-design/icons";
import {useTranslation} from "react-i18next";
import {ItemForm} from "./itemForm/ItemForm";
import {CollectionType} from "../../api/collectionsApi";
import {ItemType} from "../../api/itemsApi";



type PropsType = {
    collection: CollectionType
    edit?: boolean
    disabled?: boolean
    item?:ItemType
}

export const ItemModal = ({collection, edit, disabled, item}: PropsType) => {

    const [open, setOpen] = useState(false);
    const {t} = useTranslation();
    const showModal = () => {
        setOpen(!open)
    }

    return (
        <>
            {edit
                ?<Button onClick={showModal} disabled={disabled} type="primary" size="small"
                     icon={<EditOutlined/>}>{t("edit")}</Button>
                :<Button onClick={showModal} type="text" icon={<AppstoreAddOutlined/>}>{t("addItem")}</Button>}
            <Modal
                centered
                open={open}
                title={edit? t("editItem"): t("addItem")}
                onOk={showModal}
                onCancel={showModal}
                footer={[
                    <ItemForm key="userId"
                              showModal={showModal}
                              collection={collection}
                              item={item}
                              edit={edit}/>
                ]}
            >
            </Modal>
        </>
    );
};

