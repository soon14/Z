
<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="24">
                <span class="expand-key">商品名称: </span>
                <span class="expand-value">{{ row.skuName}}</span>
            </Col>
            
        </Row>
        <Row>
           <Col span="8">
                <span class="expand-key">条码: </span>
                <span class="expand-value">{{ row.barcode}}</span>
            </Col>
            <Col span="8">
                <span class="expand-key">货号: </span>
                <span class="expand-value">{{ row.skuCode }}</span>
            </Col>
             <Col span="8">
                <span class="expand-key">规格: </span>
                <span class="expand-value">{{ row.skuTypeDesc }}</span>
            </Col>
        </Row>
    </div>
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>