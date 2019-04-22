<template>
    <div class="tags" v-if="showTabs">
        <ul>
            <a-dropdown :trigger="['contextmenu']">
                <span style="user-select: none">

                    <li id="tag-li" class="tags-li" v-for="(item,index) in tagsList"
                        :class="{'active': isActive(item.path)}"
                        :key="index">
                        <router-link :to="item.path" class="tags-li-title">
                            {{item.title}}
                        </router-link>
                        <span class="tags-li-icon" @click="closeTags(index)"><a-icon type="close"></a-icon></span>
                    </li>
                    </span>
                <a-menu slot="overlay"
                        @click="onClick">
                    <!--                    <a-menu-item key="close-left">关闭左边项</a-menu-item>-->
                    <!--                    <a-menu-item key="close-right">关闭右边项</a-menu-item>-->
                    <a-menu-item key="close-other" data-vkey="关闭其它项">关闭其它项</a-menu-item>
                    <a-menu-item key="close-all">关闭所有项</a-menu-item>
                </a-menu>
            </a-dropdown>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "tabs",
        data() {
            return {
                tagsList: [],
                overlayClassName: ''
            }
        },
        computed: {
            showTabs() {
                return this.tagsList.length > 0
            }
        },
        methods: {
            onClick({item, key, keyPath, domEvent}) {
                // console.log('item', item.getAttribute('data-vkey'))
                console.log('domEvent', domEvent.target.getAttribute('data-vkey'))
                console.log('key', key, 'keyPath', keyPath)
                switch (key) {
                    case 'close-left':
                        // console.log(this.$route.fullPath)
                        this.closeLeft(this.$route.fullPath)
                        // console.log(document.getElementsByClassName("tags-li")[1].getElementsByTagName('a')[0].getAttribute('href'))
                        break
                    case 'close-right':
                        // console.log(this.$route.fullPath)
                        this.closeRight(this.$route.fullPath)
                        break
                    case 'close-other':
                        this.closeOther()
                        break
                    case 'close-all':
                        this.closeAll()
                        break
                    default:
                        break
                }
            },
            isActive(path) {
                return path === this.$route.fullPath;
            },
            // 关闭单个标签
            closeTags(index) {
                const delItem = this.tagsList.splice(index, 1)[0];
                const item = this.tagsList[index] ? this.tagsList[index] : this.tagsList[index - 1];
                if (item) {
                    delItem.path === this.$route.fullPath && this.$router.push(item.path);
                } else {
                    this.$router.push('/');
                }
            },
            // 关闭其他标签
            closeOther() {
                const curItem = this.tagsList.filter(item => {
                    return item.path === this.$route.fullPath;
                })
                this.tagsList = curItem;
            },
            closeLeft(route) {
                const curItem = this.tagsList.filter(item => {
                    return item.path === route;
                })
                const currentIndex = this.tagsList.indexOf(route)
                console.log(curItem.index)

                if (currentIndex > 0) {
                    this.tagsList.forEach((item, index) => {
                        if (index < currentIndex) {
                            this.remove(item)
                        }
                    })
                } else {
                    this.$message.info('左侧没有标签')
                }
            },
            closeRight(route) {
                const currentIndex = this.tagsList.indexOf(route)
                console.log(currentIndex)
                if (currentIndex > 0) {
                    this.tagsList.forEach((item, index) => {
                        if (index > currentIndex) {
                            this.remove(item)
                        }
                    })
                } else {
                    this.$message.info('右侧没有标签')
                }
            },
            // 关闭全部标签
            closeAll() {
                this.tagsList = [];
                this.$router.push('/');
            },
            // 设置标签
            setTags(route) {
                const isExist = this.tagsList.some(item => {
                    return item.path === route.fullPath;
                })
                if (!isExist) {
                    if (this.tagsList.length >= 8) {
                        this.tagsList.shift();
                    }
                    this.tagsList.push({
                        title: route.meta.title,
                        path: route.fullPath,
                    })
                }
            },
        },

        watch: {
            $route(newValue, oldValue) {
                this.setTags(newValue);
            }
        },
        created() {
            this.setTags(this.$route);
        }
    }
</script>

<style lang="scss">
    .tags {
        position: relative;
        height: auto;
        overflow: hidden;
        background: #fff;
        padding-right: 120px;
        margin-top: 10px;
    }

    .tags-li {
        float: left;
        margin: 3px 5px 2px 3px;
        border-radius: 3px;
        font-size: 12px;
        overflow: hidden;
        cursor: pointer;
        height: 40px;
        line-height: 40px;
        border: 1px solid #e9eaec;
        background: #fff;
        padding: 0 5px 0 12px;
        vertical-align: middle;
        color: #666;
        -webkit-transition: all .3s ease-in;
        -moz-transition: all .3s ease-in;
        transition: all .3s ease-in;
    }

    .tags-li.active {
        color: #fff;
        border: 1px solid #409EFF;
        background-color: #409EFF;
        text-decoration: none;

    }


    .tags-li-title {
        float: left;
        max-width: 80px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-right: 5px;
        color: #666;
    }

    .tags-li.active .tags-li-title {
        color: #fff;
    }


</style>
