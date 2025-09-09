import {ThemeSidebarItem} from "vuepress-theme-plume";

class SideBarNode {
    text: string
    link: string
    prefix: string
    collapsed: boolean | undefined
    items: SideBarNode[]

    constructor(text: string, link: string, prefix = "", collapsed=undefined) {
        this.text = text;
        this.link = link;
        this.prefix = prefix;
        this.collapsed = collapsed;
    }

    addItem(item: SideBarNode) {
        if (!this.items) {
            this.items = [];
        }
        this.items.push(item);
    }

    toThemeSidebarItem(): ThemeSidebarItem {
        let themeSidebarItem: ThemeSidebarItem = {
            text: this.text,
            link: this.link,
            prefix: this.prefix,
            collapsed: this.collapsed,
            items: []
        };
        if (this.items && this.items.length > 0) {
            themeSidebarItem.items = this.items.map(item => item.toThemeSidebarItem());
        } else {
            delete themeSidebarItem.items;
        }
        return themeSidebarItem;
    }
}

function GenerateSidebar(root: SideBarNode[]): ThemeSidebarItem[] {
    const result: ThemeSidebarItem[] = [];
    root.forEach(node => {
        result.push(node.toThemeSidebarItem());
    });
    return result;
}

export {SideBarNode, GenerateSidebar};