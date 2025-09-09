import {ThemeSidebarItem} from "vuepress-theme-plume";

class SideBarNode {
    title: string
    link: string = ""
    prefix: string = ""
    collapsed: boolean | undefined = undefined
    items: SideBarNode[]

    constructor() {
    }

    addItem(item: SideBarNode) {
        if (!this.items) {
            this.items = [];
        }
        this.items.push(item);
    }

    toThemeSidebarItem(): ThemeSidebarItem {
        let themeSidebarItem: ThemeSidebarItem = {
            text: this.title,
            link: this.link == "" ? undefined : this.link,
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

function GenerateNode(title: string, link: string = "", prefix: string = "", collapsed: boolean | undefined = undefined, items: SideBarNode[] = []): SideBarNode {
    const node = new SideBarNode();
    node.title = title;
    node.prefix = prefix;
    node.link = link;
    node.collapsed = collapsed;
    node.items = items;
    return node;
}

export {SideBarNode, GenerateSidebar, GenerateNode};