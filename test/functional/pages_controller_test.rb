require 'test_helper'

class PagesControllerTest < ActionController::TestCase
  test "should get home" do
    get :home
    assert_response :success
  end

  test "should get ver" do
    get :ver
    assert_response :success
  end

  test "should get help" do
    get :help
    assert_response :success
  end

  test "should get contactus" do
    get :contactus
    assert_response :success
  end

end
