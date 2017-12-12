#################
#### imports ####
#################

from project import app, db
from project.models import Order, User
from flask import flash, redirect, session, url_for, render_template, Blueprint, request
from functools import wraps
from project.form import OrderForm

################
#### config ####
################

home_blueprint = Blueprint(
    'home', __name__,
    template_folder='templates'
)


##########################
#### helper functions ####
##########################


def login_required(test):
    @wraps(test)
    def wrap(*args, **kwargs):
        if 'logged_in' in session:
            return test(*args, **kwargs)
        else:
            flash('Please login first.')
            return redirect(url_for('users.home'))
    return wrap


################
#### routes ####
################

@home_blueprint.route('/order', methods=['GET', 'POST'])
@login_required
def order():
    menu = ["AA_burger", "chicken_clucker"]
    form = OrderForm()
    if request.method == 'POST':
        if form.validate_on_submit:
            session['item'] = form.item.data
            new_order = Order(name = form.item.data, patty = int(form.patty.data),
                                 no_bun = form.no_bun.data, cheese = form.cheese.data,
                                 bacon = form.bacon.data)
            db.session.add(new_order)
            user = db.session.query(User).filter_by(email = session['user_email']).one()
            user.orders.append(new_order)
            db.session.commit()
            return redirect(url_for('home.success'))
    def length(a):
        return len(a)
    return render_template('order.html', form=form, title="Hungry? Order Now!",\
                                         menu=menu, len=length, username=session['username'])

@home_blueprint.route('/success')
@login_required
def success():
    return render_template('success.html', title="Order Placed!")


@home_blueprint.route('/kitchen', methods=['GET', 'POST'])
def kitchen():
    if request.method == 'POST':
        order_id = int(request.values.get('order_id'))
        this_order = db.session.query(Order).filter_by(id=order_id).one()
        db.session.delete(this_order)
        db.session.commit()
        return redirect('kitchen')
    orders = db.session.query(Order).all()
    def length(a):
        return len(a)
    return render_template('kitchen.html', title="Order List", orders=orders, len=length)




#
