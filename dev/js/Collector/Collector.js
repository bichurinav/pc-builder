import collectorStore from "@/js/store/collector";

class Collector {
    constructor() {
        this.$counter = collectorStore.$counter
        this.$counter.textContent = collectorStore.count
    }
}

export default Collector
