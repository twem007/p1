/**
 * 字典型的数据存取类。
 */
class Dictionary<T> {
	private m_keys: any[] = [];
	private m_values: T[] = [];

	public get length(): number {
		return this.m_keys.length;
	}
	/**
	 * 获取所有的子元素列表。
	 */
	public get values(): T[] {
		return this.m_values.concat();
	}

	/**
	 * 获取所有的子元素键名列表。
	 */
	public get keys(): any[] {
		return this.m_keys.concat();
	}

	/**
	 * 获取指定对象的键名索引。
	 * @param	key 键名对象。
	 * @return 键名索引。
	 */
	public indexOf(key: any): number {
		return this.m_keys.indexOf(key);
	}

	/**
	 * 添加指定键名的值。
	 * @param	key 键名。
	 * @param	value 值。
	 */
	public add(key: any, value: T): void {
		var index: number = this.indexOf(key);
		if (index >= 0) {
			this.m_values[index] = value;
		} else {
			this.m_keys.push(key);
			this.m_values.push(value);
		}
	}

	/**
	 * 返回指定键名的值。
	 * @param	key 键名对象。
	 * @return 指定键名的值。
	 */
	public get(key: any): T {
		var index: number = this.indexOf(key);
		if (index >= 0) {
			return this.m_values[index];
		}
		return null;
	}

	/**
	 * 移除指定键名的值。
	 * @param	key 键名对象。
	 * @return 是否成功移除。
	 */
	public remove(key: any): T {
		var index: number = this.indexOf(key);
		if (index >= 0) {
			this.m_keys.splice(index, 1);
			return this.m_values.splice(index, 1)[0];
		}
		return null;
	}

	/**
	 * 清除此对象的键名列表和键值列表。
	 */
	public clear() {
		this.m_keys.length = 0;
		this.m_values.length = 0;
	}

	/**
	 * 随机获取一条数据
	 */
	public getRandomData(): T {
		var index: number = Math.random() * this.keys.length << 0;
		return this.m_values[index];
	}
}

