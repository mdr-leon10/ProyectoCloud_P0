class Api::EventsController < ApplicationController

    def post_event
        @event = @current_user.events.create(event_params)
        if @event.errors
            render json: @event.errors
        else
            render json: @event, status: 400
        end
    end

    def put_event
        @event = @current_user.events.find(params[:id])
        if @event
            @event.update(event_params)
            if @event.errors
                render json: @event.errors
            else
                render json: {message: 'Event succesfully updated.'}, status: 200
            end
        else
            render json: {message: 'Event not found.'}, status: 404
        end
    end

    def delete_event
        @event = @current_user.events.find(params[:id])
        if @event 
            @event.delete
            if @event.errors
                render json: @event.errors
            else
                render json: {message: 'Event succesfully deleted'}, status: 200
            end
        else
            render json: {message: 'Event not found.'}, status: 404
        end

    end

    def get_event

        @event = @current_user.events.find(params[:id])
        if @event
            render json: @event
        else
            render json: {message: 'Event not found.'}, status: 404
        end
    end

    def get_events
        @event = @current_user.events.order(:timestamps)
        render json: @event
    end

    private

    def event_params
        params.permit(:event_name, :event_category, :event_place, :event_address, :event_initial_date, :event_final_date, :event_type, :thumbnail)
    end
end
