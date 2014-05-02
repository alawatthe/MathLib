/**
 * Adjust the rendering if the screen is resized
 *
 * @param {number} width The new width  
 * @param {number} height The new height  
 * @return {Screen3D}
 */
resize(width : number, height : number) : Screen3D {
	this.renderer.setSize(width, height);
	this.camera.aspect = width / height;
	this.camera.updateProjectionMatrix();

	return this;
}