<template>
  <div class="vux-upload">
    <flexbox :gutter="0" wrap="wrap">
      <flexbox-item :span="span" v-for="(item, index) in images" :key="index"
                    @click.native="onPreview(index)">
        <div class="vux-upload-bg">
          <div class="vux-upload-content" :style="'background-image:url('+item+')'">
            <x-icon type="ios-close" class="red" @click.native="onRemove(index)"></x-icon>
          </div>
        </div>
      </flexbox-item>
      <flexbox-item :span="span" v-show="images.length < max">
        <div class="vux-upload-bg">
          <div class="weui-uploader__input-box vux-upload-content">
            <input ref="file" class="weui-uploader__input" type="file"
                   accept="image/*" capture="capture" @change="onChange">
          </div>
        </div>
      </flexbox-item>
    </flexbox>
    <previewer :list="images.map(src => ({src}))" ref="previewer"></previewer>
  </div>
</template>

<script>
  import {Flexbox, FlexboxItem, Previewer} from 'vux'
  import lrz from 'lrz'

  export default {
    name: "Uploader",
    components: {
      Flexbox,
      FlexboxItem,
      Previewer
    },
    model: {
      prop: 'images',
      event: 'change'
    },
    props: {
      max: {
        type: Number,
        default: 10
      },
      span: {
        type: Number,
        default: 4
      },
      images: {
        type: Array,
        default: () => []
      }
    },
    methods: {
      onChange(event) {
        // 移动端仅支持单文件上传
        const reader = new FileReader();
        reader.onload = (e) => {
          this.images.push(e.target.result);
        }
        reader.readAsDataURL(event.target.files[0])
      },
      onPreview(index) {
        console.log(this.$refs.previewer)
        this.$refs.previewer.show(index)
      },
      onRemove(index) {
        this.images = this.images.filter((value, key) => index = key)
      }
    }
  }
</script>

<style lang="less">
  @import '~vux/src/styles/weui/widget/weui-uploader/index.less';

  .vux-upload {
    overflow: initial;
    width: 100%;
    .vux-flexbox-item {
      padding-top: 7px;
      padding-bottom: 7px;
      .vux-upload-bg {
        .loading:before, .loading:after {
          width: 0;
          height: 0;
        }
        .weui-loading {
          width: 30px;
          height: 30px;
          position: absolute;
          top: 50%;
          left: 50%;
          margin-top: -15px;
          margin-left: -15px;
        }
        width: 80%;
        margin-left: 10%;
        .vux-x-icon {
          fill: #F70968;
          position: absolute;
          top: 0;
          left: 100%;
          width: 20px;
          height: 20px;
          transform: translate(-50%, -50%);
        }
        .vux-upload-content {
          width: 100%;
          height: 0;
          padding-bottom: 100%;
          margin: 0;
          background-size: cover;
          position: relative;
        }
      }
    }
  }
</style>
