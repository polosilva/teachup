require 'test_helper'

class IframesControllerTest < ActionController::TestCase
  setup do
    @iframe = iframes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:iframes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create iframe" do
    assert_difference('Iframe.count') do
      post :create, iframe: @iframe.attributes
    end

    assert_redirected_to iframe_path(assigns(:iframe))
  end

  test "should show iframe" do
    get :show, id: @iframe
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @iframe
    assert_response :success
  end

  test "should update iframe" do
    put :update, id: @iframe, iframe: @iframe.attributes
    assert_redirected_to iframe_path(assigns(:iframe))
  end

  test "should destroy iframe" do
    assert_difference('Iframe.count', -1) do
      delete :destroy, id: @iframe
    end

    assert_redirected_to iframes_path
  end
end
